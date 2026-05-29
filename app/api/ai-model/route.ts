import axios from "axios";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { messages } = body;

        const aiResponse = await axios({
            url: process.env.OPENROUTER_API_URL,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "HTTP-Referer": `${process.env.HTTP_SERVER_URL}`,
            },
            data: {
                model: `${process.env.AI_MODEL}`,
                messages: messages,
                stream: true,
            },
            responseType: "stream",
        });

        console.log('Post Ai Messages', messages)
        console.log('get stream response', aiResponse.data)

        const stream = aiResponse.data;
        const encoder = new TextEncoder();

        let closed = false;

        const readable = new ReadableStream({
            start(controller) {
                stream.on("data", (chunk: Buffer) => {
                    const payloads = chunk.toString().split("\n\n");

                    for (const payload of payloads) {
                        const trimmed = payload.trim();

                        // OpenRouter/OpenAI stream ending
                        if (trimmed === "data: [DONE]") {
                            if (!closed) {
                                closed = true;
                                controller.close();
                            }
                            return;
                        }

                        if (trimmed.startsWith("data:")) {
                            try {
                                const json = trimmed.replace(/^data:\s*/, "");
                                const data = JSON.parse(json);

                                const text =
                                    data.choices?.[0]?.delta?.content;

                                if (text && !closed) {
                                    controller.enqueue(
                                        encoder.encode(text)
                                    );
                                }
                            } catch (err) {
                                console.error("Stream parse error:", err);
                            }
                        }
                    }
                });

                stream.on("end", () => {
                    if (!closed) {
                        closed = true;
                        controller.close();
                    }
                });

                stream.on("error", (err: any) => {
                    console.error("Stream Error:", err);

                    if (!closed) {
                        closed = true;
                        controller.error(err);
                    }
                });
            },
        });

        return new Response(readable, {
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
                "Cache-Control": "no-cache",
                Connection: "keep-alive",
            },
        });
    } catch (error) {
        console.error("API ERROR:", error);
        return Response.json({ success: false, error: error, }, { status: 500 });
    }
}