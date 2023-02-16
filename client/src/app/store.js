import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/users/userSlice'
import allUserReducer from '../features/Admin/allUserSlice'
import WorkspaceSlice from '../features/users/WorkspaceSlice'
import userDetailSlice from '../features/users/userAllDetails'


export const store = configureStore({
    reducer: {
        user: userReducer,
        users: allUserReducer,
        workspace: WorkspaceSlice,
        userDetails: userDetailSlice
    }
})