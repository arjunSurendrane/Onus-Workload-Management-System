import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
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
      ref: 'User'
    },
    updateTime: {
      type: Date,
      default: Date.now()
    }
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
});

taskSchema.virtual("project", {
  ref: "projects",
  localField: "task.taskName",
  foreignField: "_id",
});

taskSchema.set("toObject", { virtuals: true });
taskSchema.set("toJSON", { virtuals: true });

const Task = mongoose.model("Task", taskSchema);
export default Task;
