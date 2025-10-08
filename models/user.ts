// Model/user.ts
import mongoose, { Schema, model, models } from "mongoose"


const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email:{type:String, required:true, unique:true},
    password: { type: String, required: true,select:false },
    salt:{type:String, required: true,select:false},
    role:{type:String, required: true,default:"USER"},
  },
  {
    timestamps: true, 
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.salt;
        return ret;
      }
    }
  }
)

const User = models.User || model("User", userSchema)

export default User
