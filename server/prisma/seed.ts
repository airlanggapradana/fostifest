// typescript
import {PrismaClient, Prisma, RegistrationStatus} from '../generated/prisma'
import {faker} from '@faker-js/faker'

const prisma = new PrismaClient()

function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

async function main() {
  const TARGET = 250
  const TEAM_MIN = 5
  const TEAM_MAX = 10
  // team size must be 2–3 including leader -> participants (excluding leader) must be 1–2
  const MIN_PARTICIPANTS_PER_TEAM = 1
  const MAX_PARTICIPANTS_PER_TEAM = 2

  const competitions = await prisma.competition.findMany({
    select: {id: true, type: true}
  })
  const users = await prisma.user.findMany({select: {id: true, role: true}})

  const participantUsers = users.filter(u => u.role === 'PARTICIPANT')
  const teamComps = competitions.filter(c => c.type === 'TEAM')
  const individualComps = competitions.filter(c => c.type === 'INDIVIDUAL')
  const teamCompIds = new Set(teamComps.map(c => c.id))

  // Decide how many team registrations we want (between 5 and 10)
  let desiredTeamRegs = randInt(TEAM_MIN, TEAM_MAX)

  // If there are no TEAM competitions or no participant users, we cannot create team regs
  if (teamComps.length === 0 || participantUsers.length === 0) {
    console.warn('No TEAM competitions or no PARTICIPANT users; team registrations will be 0.')
    desiredTeamRegs = 0
  }

  // Ensure we have enough teams to support desiredTeamRegs
  const existingTeamCount = await prisma.team.count()
  const needTeams = Math.max(0, desiredTeamRegs - existingTeamCount)

  if (needTeams > 0) {
    // Avoid duplicate (competitionId, leaderId) pairs
    const usedPair = new Set<string>()
    const bulkTeams: Prisma.TeamCreateManyInput[] = []

    while (bulkTeams.length < needTeams) {
      const comp = faker.helpers.arrayElement(teamComps)
      const leader = faker.helpers.arrayElement(participantUsers)
      const key = `${comp.id}:${leader.id}`
      if (usedPair.has(key)) continue
      usedPair.add(key)

      bulkTeams.push({
        id: faker.string.uuid(),
        name: `${faker.company.name()} Team ${faker.string.alphanumeric(6)}`, // avoid @@unique([name, competitionId]) collisions
        leaderId: leader.id,
        competitionId: comp.id
      })
    }

    await prisma.team.createMany({data: bulkTeams, skipDuplicates: true})
  }

  // Refresh teams (need leaderId for registrations)
  const teams = await prisma.team.findMany({
    select: {id: true, competitionId: true, leaderId: true}
  })

  // Seed participants for TEAM competitions (1–2 participants per team, excluding leader)
  for (const team of teams) {
    if (!teamCompIds.has(team.competitionId)) continue

    const current = await prisma.participant.count({where: {teamId: team.id}})
    const desiredMembersExcludingLeader = randInt(MIN_PARTICIPANTS_PER_TEAM, MAX_PARTICIPANTS_PER_TEAM)
    if (current >= desiredMembersExcludingLeader) continue

    const toAdd = desiredMembersExcludingLeader - current
    const participants = Array.from({length: toAdd}, () => {
      const fullName = faker.person.fullName()
      return {
        id: faker.string.uuid(),
        name: fullName,
        email: faker.internet.email(),
        phoneNumber: faker.phone.number(),
        teamId: team.id
      }
    })

    await prisma.participant.createMany({data: participants})
  }

  // Pick a random subset of teams to register (size = desiredTeamRegs)
  const shuffledTeams = shuffle([...teams])
  const pickedTeams = shuffledTeams.slice(0, desiredTeamRegs)

  const teamRegs: Prisma.RegistrationCreateManyInput[] = pickedTeams.map(t => ({
    id: `REG-${faker.string.alphanumeric(5).toUpperCase()}`,
    status: 'PENDING' as RegistrationStatus,
    competitionId: t.competitionId,
    userId: t.leaderId, // match spec: team registration is by the leader
    teamId: t.id
  }))

  // Fill the rest with individual registrations if possible (avoid duplicates per user+competition)
  const remaining = Math.max(0, TARGET - teamRegs.length)
  const individualRegs: Prisma.RegistrationCreateManyInput[] = []

  if (remaining > 0 && individualComps.length > 0 && participantUsers.length > 0) {
    const usedUserComp = new Set<string>()
    // Preload existing user+competition registrations to avoid duplicates
    const existingRegs = await prisma.registration.findMany({
      where: {userId: {not: null}},
      select: {competitionId: true, userId: true}
    })
    for (const r of existingRegs) {
      if (r.userId) usedUserComp.add(`${r.competitionId}:${r.userId}`)
    }

    // Build unique registrations
    const poolSize = individualComps.length * participantUsers.length
    const maxAttempts = Math.min(poolSize * 3, remaining * 10)
    let attempts = 0

    while (individualRegs.length < remaining && attempts < maxAttempts) {
      attempts++
      const comp = faker.helpers.arrayElement(individualComps)
      const user = faker.helpers.arrayElement(participantUsers)
      const key = `${comp.id}:${user.id}`
      if (usedUserComp.has(key)) continue
      usedUserComp.add(key)

      individualRegs.push({
        id: `REG-${faker.string.alphanumeric(5).toUpperCase()}`,
        status: 'PENDING' as RegistrationStatus,
        competitionId: comp.id,
        userId: user.id,
        teamId: null
      })
    }

    if (individualRegs.length < remaining) {
      console.warn(`Could not reach ${remaining} individual registrations due to limited unique pairs.`)
    }
  } else if (remaining > 0) {
    // Fallback: if we cannot create individual regs, try adding more teams
    const extraNeed = remaining
    if (teamComps.length > 0 && participantUsers.length > 0) {
      const usedPair = new Set<string>()
      const extraTeams: Prisma.TeamCreateManyInput[] = []

      while (extraTeams.length < extraNeed) {
        const comp = faker.helpers.arrayElement(teamComps)
        const leader = faker.helpers.arrayElement(participantUsers)
        const key = `${comp.id}:${leader.id}`
        if (usedPair.has(key)) continue
        usedPair.add(key)

        extraTeams.push({
          id: faker.string.uuid(),
          name: `${faker.company.name()} Team ${faker.string.alphanumeric(6)}`,
          leaderId: leader.id,
          competitionId: comp.id
        })
      }

      await prisma.team.createMany({data: extraTeams, skipDuplicates: true})

      const newTeams = await prisma.team.findMany({select: {id: true, competitionId: true, leaderId: true}})
      const registeredTeamIds = new Set(pickedTeams.map(t => t.id))
      const availableTeams = newTeams.filter(t => !registeredTeamIds.has(t.id))
      const extraPicked = shuffle(availableTeams).slice(0, extraNeed)

      const extraTeamRegs: Prisma.RegistrationCreateManyInput[] = extraPicked.map(t => ({
        id: `REG-${faker.string.alphanumeric(5).toUpperCase()}`,
        status: 'PENDING' as RegistrationStatus,
        competitionId: t.competitionId,
        userId: t.leaderId,
        teamId: t.id
      }))
      teamRegs.push(...extraTeamRegs)
    } else {
      console.warn(`Could not reach ${TARGET}; inserting ${teamRegs.length} registrations (no individual comps or participant users).`)
    }
  }

  const registrations = [...teamRegs, ...individualRegs]

  await prisma.registration.createMany({
    data: registrations,
    skipDuplicates: true
  })

  console.log(
    `Attempted to insert ${registrations.length} registrations: teams=${teamRegs.length}, individuals=${individualRegs.length}.`
  )
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })