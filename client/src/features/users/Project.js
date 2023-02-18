import { createSlice } from "@reduxjs/toolkit";



const INITIAL_STATE = {
    projectID: ""
}

const projectSlice = createSlice({
    name: 'Project',
    initialState: INITIAL_STATE,
    reducers: {
        createProjectId: (state, action) => {
            state.projectID = action.payload
            localStorage.setItem('ProjectId', action.payload)
        }
    }
})

export const { createProjectId } = projectSlice.actions;
export default projectSlice.reducer
export const fetchProductId = (state) => state.project.projectID