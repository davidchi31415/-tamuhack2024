// import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

import { exclude } from "@/lib/utils";
import prismadb from "@/lib/prismadb";
import { getDownloadURL, getTextFile } from "@/lib/gcloud";

const getResults = async ({ jobId }) => {
    const videoURL = await getDownloadURL({ directory: `${jobId}`, fileName: "final.mp4" });
    const script = await getTextFile({ directory: `${jobId}`, fileName: "script.txt" }).then(res => res.toString());

    return { videoURL, script };
}

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

        if (!job.done_video) {
            return new NextResponse("Job results not ready", { status: 400 });
        }

        const results = await getResults({ jobId });
        console.log(results);
        if (!results) return new NextResponse("Internal error retrieving results", { status: 400 });

        return new NextResponse(JSON.stringify(results), { status: 200 });
    } catch (error) {
        console.log("[CONVERT STATUS ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}