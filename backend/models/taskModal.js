import mongoose from "mongoose";
import Task from "../../client/src/Component/User/Task/Task";

const taskSchema = new mongoose.Schema({
    taskName: String,
    description: String,
    Assigned: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    createdDate: Date,
    dueDate: Date,
    subtasks: [{
        name: String,
        Assigned: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    }],
    attachedfiles: [{ link: String }]

})


const Task = mongoose.model('Task', taskSchema);
export default Task;