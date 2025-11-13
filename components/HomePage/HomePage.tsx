'use client'

import { logoutUserAction } from "@/app/actions/userAction";
import { useAuth } from "@/hooks/useAuth"
import Link from "next/link"
import { useRouter } from "next/navigation";



export const HomePage = () => {
  
  
  const {loading,user} = useAuth();

   




  console.log("user from homePage",user)

  

  return (
    <div className="">
      <nav>
        <ul className="flex justify-between p-2 text-NPxl">
          <li>Webex</li>
          <li>
           
            {
              loading && <Loading/>
            }
            
            {
              !loading && (
                user?
                  <AuthenticatedNavBar user={user}/>
                  :
                  <NonAuthenticatedNavBar/>
              )
            }

          </li>
        </ul>
      </nav>

      <main>
        <div
          data-section="hero-img"
          className="flex h-[300px] justify-center items-center bg-no-repeat bg-center bg-cover md:bg-contain md:bg-center"
          style={{ backgroundImage: "url('/heroimg.png')" }}
        >
          <span
            className="text-ice text-4xl font-bold text-center px-4"
            style={{
              textShadow: "0 0 5px rgba(0,0,0,0.6), 0 0 10px rgba(0,0,0,0.3)",
            }}
          >
            Build Powerful Websites, Simplified
          </span>
        </div>

        <section data-section="hero-content" className="mt-2">
          <div className="h-[300px] overflow-x-auto overflow-y-hidden flex gap-4 px-4 custom-scroll p-4 border-t-1 border-b-1 border-neutral-500 m-2">
            <img src="/website-eg-template/4.jpg" className="h-full object-cover rounded-lg" />
            <img src="/website-eg-template/one.webp" className="h-full object-cover rounded-lg" />
            <img src="/website-eg-template/two.jpg" className="h-full object-cover rounded-lg" />
            <img src="/website-eg-template/three.jpg" className="h-full object-cover rounded-lg" />
          </div>
        </section>
        
       
      </main>

      <footer></footer>
      
    </div>
  )
}


const NonAuthenticatedNavBar = () =>{

  

  return (
            <ul className="flex gap-4">
         
              <Link href={`/${'guest'}/${'demo'}/editor`}><li>Get Started</li></Link>
              <Link href="/register"><li>Sign up</li></Link>
              <Link href="/login"><li>login</li></Link>
            </ul>
        )

}


const  AuthenticatedNavBar= ({user}) =>{
    const router = useRouter();
    const userId = user._id;

    
async function handleLogOut(){
  // destroySession();

  try{
    await logoutUserAction();
    console.log("awaiting")
    router.push('/login');
  }catch(error){
    console.log(error)
  }
  
  
}

  return (
            <ul className="flex gap-4">
         
              <Link href={`/projects`}><li>Editor</li></Link>
              {/* <Link href="/logout"><li>logout</li></Link> */}
              <span className="cursor-pointer" onClick={handleLogOut}>Logout</span>
            </ul>
        )

  
}

const Loading = () =>{
  return <span>Loading....</span>
}

