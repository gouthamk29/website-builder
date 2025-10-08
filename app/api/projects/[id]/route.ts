

import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDb"; // your existing DB connection file
import Project from "@/models/project";  // your schema file

// GET /api/projects/[id]
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const { id } = params;

    // Fetch project by ID and populate user info
    const project = await Project.findById(id).populate("userId", "name email role");

    if (!project) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ project }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching project:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
