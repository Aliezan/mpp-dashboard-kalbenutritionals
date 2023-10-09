import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const userPassword = await hash('user', 12);
  const user = await prisma.user.upsert({
    where: { email: 'user@mail.com' },
    update: {},
    create: {
      email: 'user@mail.com',
      name: 'User',
      password: userPassword,
    },
  });

  const adminPassword = await hash('admin', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@mail.com' },
    update: {},
    create: {
      email: 'admin@mail.com',
      name: 'Admin',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  const superPassword = await hash('super', 12);
  const superAdmin = await prisma.user.upsert({
    where: { email: 'super@mail.com' },
    update: {},
    create: {
      email: 'super@mail.com',
      name: 'Super Admin',
      password: superPassword,
      role: 'SUPER_ADMIN',
    },
  });

  const devPassword = await hash('development', 12);
  const dev = await prisma.user.upsert({
    where: { email: 'dev@mail.com' },
    update: {},
    create: {
      email: 'dev@mail.com',
      name: 'dev',
      password: devPassword,
      role: 'SUPER_ADMIN',
    },
  });

  const createTablesUser = await prisma.mPP.upsert({
    where: {
      userId: '6bab7373-35c3-4f71-b51b-12383253f6ed',
    },
    update: {},
    create: {
      Employee_ID: '230100010',
      Employee_Name: 'DWI CAHYO',
      Join_Date: '2022-01-01T00:00:00Z',
      Job_Title_Name: 'TEST',
      Org_Group_Name: 'TEST',
      Job_Level_Code: 'TEST',
      Category: 'TEST',
      Status: 'TEST',
      MPP: 1,
      Actual: 1,
      Gap: 0,
      userId: '6bab7373-35c3-4f71-b51b-12383253f6ed',
    },
  });

  console.log({ user, admin, superAdmin, dev, createTablesUser });
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
