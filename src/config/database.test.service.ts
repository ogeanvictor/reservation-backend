import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function cleanDatabase() {
  await prisma.reservation.deleteMany();
  await prisma.user.deleteMany();
}
