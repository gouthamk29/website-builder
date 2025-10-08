"use client"

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
// import {useUser} from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default  function Home() {

    // const { user, loading } = useUser();

    const {user,loading} = useAuth();
    const router = useRouter();
    console.log(user)
    
  useEffect(() => {
    if (!loading && !user) {
      const t = setTimeout(() => router.push("/login"), 3000);
      return () => clearTimeout(t);
    }
  }, [loading, user, router]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not found, redirecting in 3s...</p>;



  return (
    <div className="bg-black home-scroll">
      <nav className=" h-10 hazard-bg  text-red-600 border-2 border-amber-50 flex items-center">
        <Link href='/editor' className="m-4 text-xl">Editor</Link>
      </nav>
      <div>
        DEV PAGE
        {user}
      </div>
    </div>
  );
}


