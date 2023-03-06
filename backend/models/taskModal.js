import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    taskName: String,
    description: String,
    Assigned: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    projectID: {
      type: mongoose.Types.ObjectId,
      ref: "Project",
    },
    priority: { type: Boolean, default: false },
    createdDate: Date,
    status: {
      type: String,
      default: "ToDo",
    },
    update: {
      updatedBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
      updateTime: {
        type: Date,
        default: Date.now(),
      },
    },
    dueDate: Date,
    subtasks: [
      {
        name: String,
        Assigned: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    attachedfiles: [{ link: String }],
  },
  {
    timestamps: true,
    versionKey: false,
    selectPopulatedPaths: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

taskSchema.pre(/^save/, function (next) {
  this.populate(["Assigned"]);
  next();
});

taskSchema.virtual("project", {
  ref: "Project",
  localField: "_id",
  foreignField: "task.taskName",
  justOne: true,
});

taskSchema.pre(/^find/, function (next) {
  this.populate(["Assigned", "project", "projectID"]);
  next();
});

const Task = mongoose.model("Task", taskSchema);
export default Task;
