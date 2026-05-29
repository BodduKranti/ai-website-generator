import { db } from "@/config/db";
import { chatTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(req: NextRequest) {
    const body = await req.json();
    const { messages, frameId } = body
    try {

        const result = await db.update(chatTable).set({
            chatMessages: messages
        })
            //@ts-ignore
            .where(eq(chatTable.frameId, frameId))

        return NextResponse.json({
            result: 'Updated',
            data: result
        })

    } catch (error: any) {
        console.log(error);
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }

}