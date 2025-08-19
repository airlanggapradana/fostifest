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

async function main() {
  const TARGET = 100
  const MAX_PARTICIPANTS_PER_TEAM = 3

  const competitions = await prisma.competition.findMany({
    select: {id: true, type: true}
  })
  const users = await prisma.user.findMany({select: {id: true}})

  const teamComps = competitions.filter(c => c.type === 'TEAM')
  const individualComps = competitions.filter(c => c.type === 'INDIVIDUAL')
  const teamCompIds = new Set(teamComps.map(c => c.id))

  // Ensure each TEAM competition has at least one team
  for (const comp of teamComps) {
    const teamCount = await prisma.team.count({where: {competitionId: comp.id}})
    if (teamCount === 0 && users.length > 0) {
      await prisma.team.create({
        data: {
          id: faker.string.uuid(),
          name: `${faker.company.name()} Team`,
          leaderId: faker.helpers.arrayElement(users).id,
          competitionId: comp.id
        }
      })
    }
  }

  // If there are no INDIVIDUAL competitions, create enough teams to reach TARGET
  if (individualComps.length === 0) {
    const totalTeams = await prisma.team.count()
    const need = Math.max(0, TARGET - totalTeams)
    if (need > 0) {
      if (users.length === 0) {
        console.warn(`No users available to lead teams; can only register existing ${totalTeams} team(s).`)
      } else {
        const bulkTeams = Array.from({length: need}, () => {
          const comp = faker.helpers.arrayElement(teamComps)
          const leader = faker.helpers.arrayElement(users)
          return {
            id: faker.string.uuid(),
            name: `${faker.company.name()} Team`,
            leaderId: leader.id,
            competitionId: comp.id
          }
        })
        await prisma.team.createMany({data: bulkTeams, skipDuplicates: true})
      }
    }
  }

  // Refresh teams
  const teams = await prisma.team.findMany({select: {id: true, competitionId: true}})

  // NEW: Seed participants for TEAM competitions (only if team has none yet)
  for (const team of teams) {
    if (!teamCompIds.has(team.competitionId)) continue

    const current = await prisma.participant.count({where: {teamId: team.id}})
    if (current >= MAX_PARTICIPANTS_PER_TEAM) continue

    const toAdd = MAX_PARTICIPANTS_PER_TEAM - current
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

  // One unique registration per team (respects unique teamId)
  let teamRegs: Prisma.RegistrationCreateManyInput[] = teams.map(t => ({
    id: faker.string.uuid(),
    status: 'PENDING' as RegistrationStatus,
    competitionId: t.competitionId,
    userId: null,
    teamId: t.id
  }))
  shuffle(teamRegs)

  let registrations: Prisma.RegistrationCreateManyInput[] = []

  if (teamRegs.length >= TARGET) {
    registrations = teamRegs.slice(0, TARGET)
  } else {
    registrations = [...teamRegs]
    const remaining = TARGET - registrations.length

    if (individualComps.length > 0 && users.length > 0) {
      const individualRegs: Prisma.RegistrationCreateManyInput[] = Array.from({length: remaining}, () => {
        const comp = faker.helpers.arrayElement(individualComps)
        const user = faker.helpers.arrayElement(users)
        return {
          id: faker.string.uuid(),
          status: 'PENDING' as RegistrationStatus,
          competitionId: comp.id,
          userId: user.id,
          teamId: null
        }
      })
      registrations = registrations.concat(individualRegs)
    } else {
      console.warn(`Not enough unique teams and no INDIVIDUAL competitions/users to fill ${TARGET} rows. Will insert ${registrations.length}.`)
    }
  }

  await prisma.registration.createMany({
    data: registrations,
    skipDuplicates: true
  })

  console.log(`Attempted to insert ${registrations.length} registrations.`)
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })