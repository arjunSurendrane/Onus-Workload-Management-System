import mongoose from 'mongoose';

const workSpaceSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: [true, 'workspace must have a name']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    members: [{
        memberId: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    }],
    Lead: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    department: [
        {
            departmentName: String,
            project: [{
                projectId: {
                    type: mongoose.Types.ObjectId,
                    ref: 'Project'
                }
            }],
        }
    ]
})

const Workspace = mongoose.model('Workspace', workSpaceSchema);
export default Workspace