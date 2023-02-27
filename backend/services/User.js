import User from '../models/userModel.js';
import Workspace from '../models/workSpaceModal.js';
import { getOrSetFunction, updateCacheMemory } from '../redis/redisFunction.js';

export const Users = async () => {
    const data = await getOrSetFunction('users', () => { return User.find(); })
    return data
}

export const updateUser = async (email, updatedData) => {
    const data = await User.findOneAndUpdate({ email }, updatedData, { new: true });
    updateCacheMemory(`user-${data._id}`, data)
}


export const findUserWithEmail = async (email) => {
    return await User.findOne({ email }).select('+password').populate("memberOf.workspace");
}


export const findUser = async (email) => {
    return await User.findOne({ email });
}


export const addWorkspaceInUser = async (userId, workdpaceId, role = 'Admin') => {
    const data = await User.findByIdAndUpdate(userId, { $push: { memberOf: { workspace: workdpaceId, role } } }, { new: true })
    updateCacheMemory(`user-${userId}`, data)
    return data
}






