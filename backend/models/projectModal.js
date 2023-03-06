import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    projectName: String,
    task: [
      {
        taskName: {
          type: mongoose.Types.ObjectId,
          ref: "Task",
        },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
    selectPopulatedPaths: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
