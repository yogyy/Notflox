import type { PrismaClient } from '@prisma/client';
import type { MongoClient } from 'mongodb';

declare global {
  namespace globalThis {
    var prismadb: PrismaClient;
  }
}
