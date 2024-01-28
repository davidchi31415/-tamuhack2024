import { NextRequest, NextResponse } from "next/server";

import { _checkConvertJob, _getConversion, _getMostRecentConvertJob } from "@/lib/runpod";
import prismadb from "@/lib/prismadb";

export async function GET(
    req: NextRequest
) {
    try {
        const jobId = req.nextUrl.searchParams.get("id");

        if (!jobId) {
            return new NextResponse("Id required", { status: 400});
        }

        const job = await prismadb.job.findUnique({ where: { id: jobId }});        
        if (!job) return new NextResponse("No job found", { status: 400 });

        if (job.done_video) {
            return new NextResponse(JSON.stringify({ workingOn: "DONE" }), { status: 200 });
        } else if (job.done_audio) {
            return new NextResponse(JSON.stringify({ workingOn: "VIDEO" }), { status: 200 });
        } else if (job.done_image) {
            return new NextResponse(JSON.stringify({ workingOn: "AUDIO" }), { status: 200 });
        } else if (job.done_text) {
            return new NextResponse(JSON.stringify({ workingOn: "IMAGE" }), { status: 200 });
        } else {
            return new NextResponse(JSON.stringify({ workingOn: "TEXT" }), { status: 200 });
        } 
    } catch (error) {
        console.log("[STATUS ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}