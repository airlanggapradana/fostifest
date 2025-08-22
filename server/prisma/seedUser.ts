import {PrismaClient, UserRole} from '../generated/prisma'
import {faker} from '@faker-js/faker'

const prisma = new PrismaClient()

const data = Array.from({length: 100}).map((_) => {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number({style: 'international'}),
    password: faker.internet.password(),
    role: 'PARTICIPANT' as UserRole,
    institusi: faker.company.name(),
  }
})

async function main() {
  await prisma.user.createMany({
    data,
    skipDuplicates: true,
  })
}

main().catch((e) => {
  console.error(e)
})
  .finally(async () => {
    console.log(`Inserted ${data.length} users.`)
    await prisma.$disconnect()
  })