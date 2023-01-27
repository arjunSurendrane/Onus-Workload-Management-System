import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: [true, 'user must have an email.id'],
        lowercase: true
    },
    mobile: Number,
    password: {
        type: String,
        select: false
    },
    block: {
        type: Boolean,
        default: false
    },
    Plan: {
        type: String,
        default: 'Free Plan'
    }
})


const User = mongoose.model('User', userSchema)
export default User