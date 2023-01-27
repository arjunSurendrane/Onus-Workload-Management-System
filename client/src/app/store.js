import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/users/userSlice'
import allUserReducer from '../features/Admin/allUserSlice'
import WorkspaceSlice from '../features/users/WorkspaceSlice'


export const store = configureStore({
    reducer: {
        user: userReducer,
        users: allUserReducer,
        workspace: WorkspaceSlice
    }
})