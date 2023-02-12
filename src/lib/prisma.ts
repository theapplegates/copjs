// This is a workaround for a bug in Next.js
import { PrismaClient } from "@prisma/client";

declare const global: Global & { prisma?: PrismaClient };

export let prisma: PrismaClient;

// Prevent multiple instances of Prisma Client in development
if (typeof window === "undefined") {
  if (process.env["NODE_ENV"] === "production") {
    prisma = new PrismaClient(); // This is only executed once in a production environment
  } else {
    if (!global.prisma) {
      global.prisma = new PrismaClient(); // This is only executed once per request
    }

    prisma = global.prisma; // This is executed on every request
  }
}
