"use server"

import { generateSalt, hashPasswordBySalt, verifyPasswordSync } from "@/helpers/passwordhelper";
import connectDB from "@/lib/connectDb";
import User from "@/models/user";
import mongoose from "mongoose";

import { Document } from 'mongoose';
import { createSession } from "../../helpers/sessionHelper";
import { cookies } from "next/headers";
import Session from "@/models/session";

interface IUser extends Document {
  name: string;
  email: string;
  hashedPassword: string;
  salt: string;
}


export async function registerUserAction(formData:FormData){

    try{
        const name = formData.get("name")?.toString().normalize();
        const email = formData.get("email")?.toString().normalize();
        const password = formData.get("password")?.toString().normalize();
        
        if(!name ||!email||!password){
        return { success: false, message: "All fields are required" };
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return { success: false, message: "Invalid email format" };
        }
        
        const salt= generateSalt();
        const hasedPassword= await hashPasswordBySalt(password,salt);

        await connectDB();

        if (mongoose.connection.readyState !== 1) {
            throw new Error("DB connection failed");
        }
        

        if(await User.findOne({email:email})!==null){
            return { success: false, message: "User already registered with same email" };
        }

                
        const user: IUser = new User({
            name,
            email,
            password:hasedPassword,
            salt,
            role:"USER"
        });

        const retUser = await user.save();
        console.log(retUser)
        console.log(retUser.toJSON())

       await  createSession(retUser._id.toString(), await cookies())

        return { success: true, message: "User registered successfully" };

    }catch(error){
        console.error("Register error:", error);
        return { success: false, message: "Internal server error" };
    }

}


export async function loginUserAction(formData:FormData) {

    try{
        const email = formData.get("email")?.toString().normalize();
        const password = formData.get("password")?.toString().normalize();
        
        if(!email||!password){
        return { success: false, message: "All fields are required" };
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return { success: false, message: "Invalid email format" };
        }
        
        await connectDB();

        if (mongoose.connection.readyState !== 1) {
            throw new Error("DB connection failed");
        }
        
        const user: IUser|null =await User.findOne({ email: email }).select("+password +salt");

        if(user==null){
            return { success: false, message: "email or password incorrect" };
        }
        
        console.log(user)

        if(!verifyPasswordSync(password,user.password.normalize(),user.salt.normalize())){
            return {success:false,message:"Password incorrect"}
        }

        //create a session

       await  createSession(user.id, await cookies())

        return { success: true, message: "User loged in successfully" };

    }catch(error){
        console.error("login error:", error);
        return { success: false, message: "Internal server error" };
    }

}




export async function logoutUserAction() {
    console.log("logout from actions")
    try{
        await connectDB();

        if (mongoose.connection.readyState !== 1) {
            throw new Error("DB connection failed");
        }
        
        const cookieStore = await cookies();
        const sessionId = cookieStore.get("session-token")?.value;

        if (!sessionId) {
        return { success: false, message: "No active session found" };
        }

        // Remove session from DB
        const deleted = await Session.findOneAndDelete({ sessionId });
        if (!deleted) {
        // still clear cookie to avoid dangling cookie
        cookieStore.delete("session-token");   
        return { success: false, message: "Session not found in DB, cookie cleared" };
        }

        // Clear cookie
        cookieStore.delete("session-token");

        return { success: true, message: "Session removed and cookie cleared" };
        

    }catch(error){
        console.error("logout error:", error);
        return { success: false, message: "Internal server error" };
    }

}