This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# Ui Dependencies
// ui.shadcn
    npx shadcn@latest init --preset [CODE] --template next
    [CODE]. Available presets: nova, vega, maia, lyra, mira, luma, sera

// for all the shadcn then 
    npx shadcn@latest add click on 'A' select all component

// Custom font add with next js in layout.tsx
    1.  import { Outfit } from 'next/font/google'
        const Outfit = Outfit({subset:['latin']})

        div className = Outfit.Classname
// Untitled UI take any logo for reference

// Lucid Icons auto installed when install ui.shadcn
    https://lucide.dev/icons/
    

# Backend Dependices
1. https://orm.drizzle.team/
    1. Step 1       :   https://orm.drizzle.team/docs/get-started
    2.      Select  :   https://orm.drizzle.team/docs/get-started/neon-new
    3.      URL     :   https://neon.com/
    
    4.      Install :   npm i drizzle-orm @neondatabase/serverless dotenv
                        npm i -D drizzle-kit tsx

    5.      npx neonctl@latest init

                    postgresql://neondb_owner:npg_lCXw5TmeGqM7@ep-raspy-tooth-apal9n2t.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require

                    Pssword     npg_lCXw5TmeGqM7

                    Host        ep-raspy-tooth-apal9n2t.c-7.us-east-1.aws.neon.tech
                    Database    neondb
                    Role        neondb_owner
                    Password    ************
                    Pooler host ep-raspy-tooth-apal9n2t-pooler.c-7.us-east-1.aws.neon.tech

        6. 
                step 1 : 
                    config [folder]
                        -   db.ts [file]
                            import { drizzle } from 'drizzle-orm/neon-http';
                            export const db = drizzle(process.env.DATABASE_URL!);
                        
                        -   schema.ts [file]
                                import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

                                export const usersTable = pgTable("users", {
                                    id: integer().primaryKey().generatedAlwaysAsIdentity(),
                                    name: varchar({ length: 255 }).notNull(),
                                    email: varchar({ length: 255 }).notNull().unique(),
                                    credits: integer().default(2) // User can create two website
                                });

        
        
        7.  drizzle.config.ts this file add where the .env files are there

                import 'dotenv/config';
                import { defineConfig } from 'drizzle-kit';

                export default defineConfig({
                out: './drizzle',
                schema: './src/db/schema.ts',
                dialect: 'postgresql',
                dbCredentials: {
                    url: process.env.DATABASE_URL!,
                },
                });


                Once change the schema values then use the point 8 and then 9
        8.  npx drizzle-kit push
        9.  npx drizzle-kit studio 
                -   database setup generete locally
        10. npm i --save-dev @types/lucide-react
        11. npm i uuid

# Authentication Library
 

1.  https://clerk.com/

    1. Signup your account
    2. SignIn your account
    3. npm install @clerk/nextjs
    4. https://clerk.com/docs/nextjs/getting-started/quickstart

        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_Y2xvc2luZy1iYXQtNDUuY2xlcmsuYWNjb3VudHMuZGV2JA
        CLERK_SECRET_KEY=sk_test_RQ3EPm1kJl3SFpfBNgUoHflx3im1t43nHSGVB2BtCA

    5. proxy.ts

        import { clerkMiddleware } from '@clerk/nextjs/server'

        export default clerkMiddleware()

        export const config = {
        matcher: [
            // Skip Next.js internals and all static files, unless found in search params
            '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
            // Always run for API routes
            '/(api|trpc)(.*)',
            // Always run for Clerk-specific frontend API routes
            '/__clerk/(.*)',
        ],
        }

    6. layout.tsx
        <ClerkProvider><html></html></ClerkProvider>

# API Calls
    1. npm install axios

# AI Generete stepss
1. kravixstudio.com
2. openrouter.ai