import { db } from "@/config/db";
import { chatTable, frameTable, projectTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    console.log('project post payload', body)
    const { projectId, frameId, messages } = body;

    const user = await currentUser();

    // create Project
    await db.insert(projectTable).values({
        projectId,
        createdBy: user?.primaryEmailAddress?.emailAddress,
    });

    // create Frame
    await db.insert(frameTable).values({
        frameId,
        projectId,
    });

    // save User Message
    await db.insert(chatTable).values({
        chatMessages: messages,
        createdBy: user?.primaryEmailAddress?.emailAddress,
    });

    return NextResponse.json({
        projectId,
        frameId,
        messages,
    });
}