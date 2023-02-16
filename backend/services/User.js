import User from '../models/userModel.js';

export const Users = async () => {
    return await User.find();
}

export const updateUser = async (email, updatedData) => {
    return await User.findOneAndUpdate({ email }, updatedData, { new: true });
}


export const findUserWithEmail = async (email) => {
    return await User.findOne({ email }).select('+password');
}


export const findUser = async (email) => {
    return await User.findOne({ email });
}





