import { NextResponse } from "next/server";

import { getUploadURL } from "@/lib/gcloud";
import prismadb from "@/lib/prismadb";
import axios from "axios";


export async function POST(
    req: Request
) {
    try {
        const body = await req.json();
        const { prompt } = body;

        if (!prompt) return new NextResponse("Need prompt", { status: 400 });
        const job = await prismadb.job.create({ 
            data: {
                prompt
            }
        });
        const response = await axios.post(
            `${process.env.RAILWAY_URL!}/api/submit`,
            {
                jobId: job.id
            }, {
                "headers": {
                    "Content-Type": "application/json"
                }
            }
        );
        if (!response) {
            return new NextResponse("Node server failed", { status: 500 });
        }

        return new NextResponse(JSON.stringify({ id: job.id }), { status: 200 });
    } catch (error) {
        console.log("[SUBMIT ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}