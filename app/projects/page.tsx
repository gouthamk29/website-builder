'use client'
import CreateProjectModal from "@/components/Modals/modal/CreateProjectModal";
import DeleteProjectModal from "@/components/Modals/modal/DeleteProjectModal";
import { useAuth } from "@/hooks/useAuth"
import { UseModalStore } from "@/store/ModalStore";
import { useRouter } from "next/navigation";
// import { Router } from "next/router";
import { useEffect, useState } from "react";

const UserProject =  () => {
  
  const [projects, setProjects] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  
  const {user,loading}=useAuth();
  const router = useRouter();

   useEffect(() => {



      if (!loading && !user) {
          router.push("/login");
      }
    }, [loading, user, router]);
  
    useEffect(() => {
    const fetchProjects = async () => {
      if (!user) return;

      setIsFetching(true);
      try {
        const res = await fetch(`/api/projects/user/${user._id}`, {
          credentials: "include",
        });

        if (!res.ok) {
          console.error("Failed to fetch projects:", res.statusText);
          return;
        }

        const data = await res.json();
        setProjects(data.projects || []);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setIsFetching(false);
      }
    };

    fetchProjects();
  }, [user]);


  return <ProjectView loading={loading} isFetching={isFetching} projects={projects}/>
}

export default UserProject



const ProjectView = ({loading,isFetching,projects}) =>{
  const { openModal } = UseModalStore()
  const router = useRouter()

  function handleRedirectToProject(projectId){
    console.log(projectId)
    router.push(`/projects/${projectId}/editor`);
  }

  function handleDeleteProject(project){
    console.log(project)
    openModal((onClose)=><DeleteProjectModal onClose={onClose} data={project}/>);

  }

  return (
    <main className="">
      <div>
        <div className="flex w-full justify-between">
          <div className="text-xl font-semibold my-4 px-4 cursor-pointer" onClick={()=>{router.push("/")}}>WebEx</div>
          <div className="text-xl font-semibold mb-4 text-center mt-4">Your projects</div>
          <div className="text-xl font-semibold my-4 px-4  cursor-pointer">🎲</div>
        </div>
        {
          loading || isFetching ?(
            <section className="flex items-center gap-4 p-3 border rounded-md animate-pulse">
              <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
              
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>

            </section>
          ):
          (

            projects.length===0?
              (
                <div>
                  <div>Project list is Empty</div>
                  <div>
                    
                  </div>
                </div>
              ):

            <section>
              <div>
                <ul className="space-y-2">
                  {projects.map((proj) => (
                    <div key={proj._id} className="flex flex-row border hover:border-green-500 transition justify-between mx-2 rounded-md">
                      <li className=" p-3 rounded-md  transition flex-1">
                        {/* <div className="font-medium">{proj.projectId}</div> */}
                        <div className="font-medium">{proj.projectName}</div>
                        <div className="text-s text-gray-400">
                          {proj.projectDescription}
                        </div>
                        <div className="text-sm text-gray-500">
                          Last updated: {new Date(proj.updatedAt).toLocaleString()}
                        </div>
                      </li>
                      <div className="flex gap-2 p-2">
                        <button className="bg-blue-500 hover:bg-blue-700 hover:ring  hover:ring-offset-1  transition my-4 px-2 rounded-sm cursor-pointer" onClick={()=>handleRedirectToProject(proj._id)}>Edit</button>
                        <button className="bg-red-500 my-4 px-2  hover:ring  hover:ring-offset-1  hover:bg-red-700 transition rounded-sm cursor-pointer" onClick={()=>handleDeleteProject(proj)}>Delete</button>
                      </div>
                    </div>
                  ))}
                </ul>
              </div>
            </section>
          )
        }
        <div className="m-2">
          <button className="bg-blue-500 rounded-2xl p-2 on"
            onClick={()=>openModal((onClose)=><CreateProjectModal onClose={onClose}/>)}
          >
                      create a new project
          </button>
        </div>
      </div>
    </main>
  )
}