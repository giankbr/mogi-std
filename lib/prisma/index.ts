import { PrismaClient } from '@prisma/client';

// Create a global PrismaClient instance to avoid too many connections in development
declare global {
  var prisma: PrismaClient | undefined;
}

// Use existing instance if available (in development) or create a new one
const prisma = global.prisma || new PrismaClient();

// In development, attach the PrismaClient to the global object to prevent multiple instances
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;
