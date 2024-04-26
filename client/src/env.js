import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

// Create environment configuration using @t3-oss/env-nextjs library
export const env = createEnv({
  server: {
    // DATABASE_URL should be a valid URL
    DATABASE_URL: z.string().url(),

    // NODE_ENV should be one of "development", "test", or "production". Default value is "development"
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),

    // NEXTAUTH_SECRET should be a string
    NEXTAUTH_SECRET: z.string(),

    // NEXTAUTH_URL should be a valid URL. Default value is "http://localhost:3000"
    NEXTAUTH_URL: z.string().url().default("http://localhost:3000"),

    // GOOGLE_CLIENT_ID should be a string
    GOOGLE_CLIENT_ID: z.string(),

    // GOOGLE_CLIENT_SECRET should be a string
    GOOGLE_CLIENT_SECRET: z.string(),
  },

  client: {
    // NEXT_PUBLIC_SOCKET_URL should be a valid URL
    NEXT_PUBLIC_SOCKET_URL: z.string().url(),
  },

  runtimeEnv: {
    // DATABASE_URL is set to the value of the corresponding environment variable
    DATABASE_URL: process.env.DATABASE_URL,

    // NODE_ENV is set to the value of the corresponding environment variable
    NODE_ENV: process.env.NODE_ENV,

    // NEXTAUTH_SECRET is set to the value of the corresponding environment variable
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,

    // NEXTAUTH_URL is set to the value of the corresponding environment variable
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,

    // GOOGLE_CLIENT_ID is set to the value of the corresponding environment variable
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,

    // GOOGLE_CLIENT_SECRET is set to the value of the corresponding environment variable
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

    // NEXT_PUBLIC_SOCKET_URL is set to the value of the corresponding environment variable
    NEXT_PUBLIC_SOCKET_URL: process.env.NEXT_PUBLIC_SOCKET_URL,
  },
});
