'use client'
import { useAuth } from "@/hooks/useAuth"
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


  //  return (
  //   <div className="p-4">
  //     <h1 className="text-xl font-semibold mb-4">Your Projects</h1>

  //     {loading || isFetching ? (
  //       <p>Loading...</p>
  //     ) : projects.length === 0 ? (
  //       <p>No projects found.</p>
  //     ) : (
  //       <ul className="space-y-2">
  //         {projects.map((proj) => (
  //           <li
  //             key={proj._id}
  //             className="border p-3 rounded-md hover:bg-gray-50 transition"
  //           >
  //             <div className="font-medium">{proj.projectId}</div>
  //             <div className="text-sm text-gray-500">
  //               Last updated: {new Date(proj.updatedAt).toLocaleString()}
  //             </div>
  //           </li>
  //         ))}
  //       </ul>
  //     )}
  //   </div>
  // );
}

export default UserProject



const ProjectView = ({loading,isFetching,projects}) =>{
  return (
    <main className="h-dvh">
      <div>
        <div className="text-xl font-semibold mb-4">Your projects</div>
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
                    <button className="bg-blue-500 rounded-2xl p-2">
                      create a new project
                    </button>
                  </div>
                </div>
              ):

            <section>
              <div>
                <ul className="space-y-2">
                  {projects.map((proj) => (
                    <li
                      key={proj._id}
                      className="border p-3 rounded-md hover:bg-gray-50 transition"
                    >
                      <div className="font-medium">{proj.projectId}</div>
                      <div className="text-sm text-gray-500">
                        Last updated: {new Date(proj.updatedAt).toLocaleString()}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )
        }
      </div>
    </main>
  )
}