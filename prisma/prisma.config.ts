// Prisma Configuration
// This file provides the database URL for Prisma
// The DATABASE_URL should be set in your .env file

export const prismaConfig = {
  datasource: {
    url: process.env.DATABASE_URL || "file:./dev.db",
  },
};

