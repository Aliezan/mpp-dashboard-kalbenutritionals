import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcrypt-ts';

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
      role: Role.USER,
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
      role: Role.ADMIN,
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
      role: Role.SUPER,
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
      role: Role.SUPER,
    },
  });

  console.log({ user, admin, superAdmin, dev });
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
