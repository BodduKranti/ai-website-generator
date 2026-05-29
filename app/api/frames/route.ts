import { db } from "@/config/db";
import { chatTable, frameTable } from "@/config/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;

    const frameIdParam = searchParams.get("frameId");

    if (!frameIdParam) {
        return NextResponse.json(
            { message: "frameId is required" },
            { status: 400 }
        );
    }

    const frameId = Number(frameIdParam);

    try {
        const frameResult = await db
            .select()
            .from(frameTable)
            //@ts-ignore
            .where(eq(frameTable.frameId, frameId));

        const chatResult = await db
            .select()
            .from(chatTable)
            //@ts-ignore
            .where(eq(chatTable.frameId, frameId));


        const finalResults = {
            ...frameResult[0],
            chatMessages: chatResult[0]?.chatMessages,
        };

        return NextResponse.json(finalResults);

    } catch (error: any) {
        console.log(error);

        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}


export async function PUT(req: NextRequest) {
    const body = await req.json()
    try {
        const { frameId, designCode, projectId } = body
        const reault = await db.update(frameTable).set({
            designCode: designCode
        })
            //@ts-ignore
            .where(and(
                eq(frameTable.frameId, frameId),
                eq(frameTable.projectId, projectId)
            ))

        return NextResponse.json({
            reault,
            message: 'Updated Frame',
            status: 200
        })

    } catch (error: any) {
        console.log(error);

        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}