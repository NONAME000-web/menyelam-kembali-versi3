import { PrismaClient } from "@prisma/client";

const prismaGlobal = global as typeof global & { prisma?: PrismaClient };

export const Database = prismaGlobal.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") prismaGlobal.prisma = Database;
