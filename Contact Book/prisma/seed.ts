import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.contact.createMany({
    data: [
      { name: 'Alice Johnson', email: 'alice@example.com', phone: '555-0101' },
      { name: 'Bob Smith', email: 'bob@example.com', phone: '555-0202' },
      { name: 'Charlie Lee', email: 'charlie@example.com', phone: '555-0303' }
    ],
  })
  console.log('Seed completed')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
