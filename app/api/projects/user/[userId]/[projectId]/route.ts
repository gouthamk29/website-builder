import { getUserfromSession } from "@/helpers/sessionHelper";
import connectDB from "@/lib/connectDb";
import Project from "@/models/project";
import { NextResponse } from "next/server";

export async function GET(req:Request,{ params }: { params: Promise<{ userId: string; projectId: string }> }){
    const { userId, projectId } = await params; 
    console.log("userId", userId);
    console.log("projectId", projectId);
    try{
        
        await connectDB();

        const user = await getUserfromSession();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const project = await Project.findOne({ userId, _id:projectId });

        if(!project){
            return NextResponse.json({error:"Project does not exist"},{status:404 });
        }

        return NextResponse.json({project},{status:200});

    }
    catch(error){
        return NextResponse.json({error},{status:500});
    }

}