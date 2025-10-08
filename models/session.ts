import  { Schema, model, models } from "mongoose"


const sessionSchema = new Schema(
  {
    sessionId: { type: String, required: true,index:true ,unique:true},
    userId: { type: String, required: true},
    expireAt: {
        type: Date,
        required: true,
        default: () => new Date(Date.now() + 15 * 60 * 1000),
        index: { expires: 0 }
    }
  },
  {
    timestamps: true
  }
)

const Session = models.Session || model("Session", sessionSchema)

export default Session
