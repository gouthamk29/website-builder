import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDb"; 
import Project from "@/models/project";  



export async function DELETE(
  request:Request,
  context:{params:Promise<{ projectId: string }>}
) {
  try{
    await connectDB();
    const { projectId } = await context.params
    const project = await Project.findOneAndDelete({ _id:projectId });
    if(!project){
      return NextResponse.json({ message: "No projects found" }, { status: 404 });
    }
    
    return NextResponse.json(
      { message: "Project deleted successfully", project },
      { status: 200 }
    );
  }catch(error){
      console.error("Error deleting project:", error)
      return NextResponse.json(
        { error: "Failed to delete project" },
        { status: 500 }
      )
  }
}


export async function PUT(
  request:Request,
  context:{params:Promise<{ projectId: string }>}
){

  try{
    await connectDB();
    console.log()
    const { projectId } = await context.params;

    const body = await request.json()
    const project = await Project.findById(projectId)
    if (!project) {
      return NextResponse.json(
        { message: "No project found" },
        { status: 404 }
      )
    }

    if (body.projectName !== undefined)
      project.projectName = body.projectName;

    if (body.projectDescription !== undefined)
      project.projectDescription = body.projectDescription;

    if (body.data !== undefined)
      project.data = body.data; 

    
    await project.save();


    return NextResponse.json(
      { message: "Project updated successfully", project },
      { status: 200 }
    );


  }catch(error){
    console.error("Error updating project:", error)
      return NextResponse.json(
        { error: "Failed to update project" },
        { status: 500 }
      )
  }


}