import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDb";
import Project from "@/models/project";

// GET /api/projects/user/[userId]
export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    await connectDB();

    const { userId } = params;

    // Find all projects belonging to this user
    const projects = await Project.find({ userId }).sort({ updatedAt: -1 });

    if (!projects || projects.length === 0) {
      return NextResponse.json({ message: "No projects found" }, { status: 200 });
    }

    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user projects:", error);
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}
