'use client'

import { loginUserAction } from "@/app/actions/userAction";
import { redirect } from "next/navigation"
import { FormEvent, useEffect, useState } from "react";


const Login = ()=>{



    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");
    
      const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
    
        setStatus("loading");
        setMessage("");
    
        const res = await loginUserAction(formData); // ✅ directly call server action
    
        if (res.success) {
          setStatus("success");
          setMessage(res.message);
          form.reset();
        } else {
          setStatus("error");
          setMessage(res.message);
        }
      };
    

      useEffect(()=>{
        if(status==="success"){
            setTimeout(() => {
                redirect("/")
            }, 5* 1000);
        }
      },[status])

    return(
        <div className="= border-2 border-white p-2 bg-green-200 text-black">
            
            <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md max-w-md">

                <label>
                    email
                </label>
                <input
                    name="email"
                    type="email"
                    placeholder="email"
                    required
                    className="bg-white  border-2 border-blue-300 rounded"
                    />
                <label>
                    password
                </label>
                <input
                    name="password"
                    type="password"
                    placeholder="password"
                    required
                    className="bg-white  border-2 border-blue-300 rounded"
                    />


                    <button
                        type="submit"
                        disabled={status === "loading"}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
                    >
                        {status === "loading" && (
                        <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4" />
                        )}
                        Submit
                    </button>

                    {status !== "idle" && <p className={status === "success" ? "text-green-600" : "text-red-500"}>{message}</p>}
                    {status ==="success" && <p className="text-green-600">redirecting to home page in 5sec</p>}
            </form>

        </div>
    )

}

export default Login;