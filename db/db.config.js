import { PrismaClient } from "@prisma/client";

export const prisma = globalThi.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}
