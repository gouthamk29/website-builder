import connectDB from "@/lib/connectDb";
import Session from "@/models/session";
import User from "@/models/user";
import crypto from "crypto"
import { cookies } from "next/headers";


const COOKIE_SESSION_KEY="session-token"
const COOKIE_EXPIRE_MS= 60 * 60 * 24 * 7 * 1000;

export async function createSession(id:string,cookieStore: Pick<Awaited<ReturnType<typeof cookies>>, "set">) {
    
    try{

        const sessionId = crypto.randomBytes(512).toString('hex').normalize();
        
        await connectDB();
        
        
        const existingSession = await Session.findOne({ userId:id });
        
        if (existingSession) {
        await Session.deleteOne({ _id: existingSession._id });
        }

        await new Session(
            {   
                userId:id,
                sessionId,
                expireAt: new Date(Date.now() + COOKIE_EXPIRE_MS)
                
            }).save();
            
            
            
            
           cookieStore.set(COOKIE_SESSION_KEY, sessionId, {
            
            secure: true,
            httpOnly: true,
            sameSite: 'lax',
            expires: new Date(Date.now() + COOKIE_EXPIRE_MS)
            });

        return { success: true, message: "Session created successfully" };
    }catch(error){
        console.error("Session error:", error);
        return { success: false, message: "Internal server error" };
    }
        
}

export async function getUserfromSession() {
    const cookieStore = await cookies();

    await connectDB();


    const sessionCookie = cookieStore.get("session-token")

    if(!sessionCookie) return null;

    const userSession = await Session.findOne({sessionId:sessionCookie?.value});

    if(!userSession){
        return null;
    }
    const user = await User.findById(userSession.userId).select("-password -salt");
    return user;
}


export async function destroySession() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(COOKIE_SESSION_KEY);
  if (cookie) {
    await Session.deleteOne({ sessionId: cookie.value });
    cookieStore.set(COOKIE_SESSION_KEY, "", { expires: new Date(0) });
  }
}