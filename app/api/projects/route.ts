import { db } from "@/config/db";
import { chatTable, frameTable, projectTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log('server post project', body)
        const { projectId, frameId, messages } = body;

        const user = await currentUser();

        await db.insert(projectTable).values({
            projectId,
            createdBy: user?.primaryEmailAddress?.emailAddress,
        });

        await db.insert(frameTable).values({
            frameId,
            projectId,
        });

        await db.insert(chatTable).values({
            chatMessages: messages,
            frameId,
            createdBy: user?.primaryEmailAddress?.emailAddress,
        });

        return NextResponse.json({
            success: true,
            projectId, frameId, messages
        });

    } catch (error) {
        console.log("API ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Something went wrong",
            },
            { status: 500 }
        );
    }
}