import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {

    // clerk provide
    const user = await currentUser();

    //If already user is exist
    const useResult = await db.select().from(usersTable)
        //@ts-ignore
        .where(eq(usersTable.email, user?.primaryEmailAddress?.emailAddress))

    // if not then insert new user

    if (useResult.length === 0) {
        const data = {
            name: user?.fullName ?? 'NA',
            email: user?.primaryEmailAddress?.emailAddress ?? '',
            credits: 2
        }
        const userInsert = await db.insert(usersTable).values({ ...data })
        return NextResponse.json({ user: data })
    }

    console.log('useResult[0]', { ...useResult[0] })

    return NextResponse.json({ user: useResult[0] })

}

