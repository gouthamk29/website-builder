'use client'

import { useState } from "react";

export default function DeleteProjectModal({ onClose,data}: { onClose: () => void,data }) {
    
    
    const [loading,setLoading] =useState(false)

    const project =data;

    if(!project){
        onClose()
    }

    async function handleDelete(projectId:string){
        try{
            setLoading(true);

            const res = await fetch(`api/projects/${projectId}`,{
                method: 'DELETE',
            })
            
            if (!res.ok) {
                throw new Error('Failed to delete project')
            }

            onClose();
            window.location.reload();
        
        }catch(error){
            console.log(error)
            setLoading(false);
        }finally{
            setLoading(false)
        }
    }

    return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-center">Delete <span className="text-xl bg-red-200 rounded text-black px-1">{project.projectName}</span> project</h3>
      <div className="">
        <p>Are you sure you want to delete this project</p>
        <div className="flex justify-end gap-4 py-4">
            <button className="px-4 py-1 rounded-2xl text-2xl bg-blue-600 hover:ring hover:ring-white-500 text-white" onClick={()=>onClose()}>Cancel</button>
            <button className="px-4 py-1 rounded-2xl text-2xl bg-red-600 text-white hover:ring hover:ring-white-500" onClick={()=>handleDelete(project._id)}>DELETE PROJECT</button>
        </div>
      </div>
    </div>
  );
}