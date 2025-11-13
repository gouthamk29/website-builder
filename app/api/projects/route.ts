import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDb";
import Project from "@/models/project";
import { getUserfromSession } from "@/helpers/sessionHelper";
import { nanoid } from "nanoid";

export async function POST(req: Request) {
  try {
    await connectDB();

    const user = await getUserfromSession();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, description, data } = body;

    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Project name is required" }, { status: 400 });
    }
    const projectName= name;
    const projectId = nanoid(10);
    const projectDescription =description;
    const project = await Project.create({
      projectId,
      projectName,
      projectDescription,
      userId: user._id,
    });

    return NextResponse.json(
      { id: project._id.toString(),userId:user._id, projectId: project.projectId },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating project:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
