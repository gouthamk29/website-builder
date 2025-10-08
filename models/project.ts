import mongoose, { model,models,Schema  } from "mongoose";

const VERSION_LIMIT = 20;

const versionSchema = new Schema(
  {
    data: Schema.Types.Mixed, // snapshot of data
    updatedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);


const projectSchema  = new Schema({
        projectId:{type:String, required:true,index:true},
        
        userId: {
        type: Schema.Types.ObjectId, 
        ref: "User", 
        required: true,
        index: true, 
        },

        data: {
        type: Schema.Types.Mixed,
        default: {},
        },

        versions:{
            type:[versionSchema],
            default:[],
        }

    },
    {
        timestamps:true
    }
)


projectSchema.pre("save", async function (next) {
  // Skip if 'data' not modified
  if (!this.isModified("data")) return next();

  // Only add versions for existing documents (not on first creation)
  if (!this.isNew) {
    try {
      // Get the old version from DB
    //   const existing = await this.constructor.findById(this._id).lean();
    const ProjectModel = mongoose.model("Project");
    const existing = await ProjectModel.findById(this._id).lean();

      if (existing && existing.data) {
        // Push old data into versions array
        this.versions.push({
          data: existing.data,
          updatedAt: new Date(),
        });

        // Limit versions to last 20
        if (this.versions.length > VERSION_LIMIT) {
            this.versions.splice(0, this.versions.length - VERSION_LIMIT);
        }
      }
    } catch (err) {
      console.error("Error fetching previous version:", err);
    }
  }

  next();
});



const Project = models.Project || model("Project", projectSchema);
export default Project;


