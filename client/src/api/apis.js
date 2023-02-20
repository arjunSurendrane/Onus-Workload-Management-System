import axios from "./index"

export const addDepartment = async (id, cookie, data) => {
    try {
        console.log(id)
        const res = await axios.patch(`/workspace/addDepartment/${id}`, { name: data }, {
            headers: {
                authorization: `Bearer ${cookie}`
            }
        })
        return res.data.status
    } catch (error) {
        return error.response.data
    }
}

export const fetchTask = async ({ id, cookies }) => {
    try {
        const res = await axios.get(`/workspace/tasks/${id}`, {
            headers: { authorization: `Bearer ${cookies}` }
        })
        localStorage.setItem('Tasks', JSON.stringify({ ...res.data.tasks }))
        return res.data.tasks

    } catch (error) {
        return error
    }
}


export const userAuthorization = async (data) => {
    try {
        const res = await axios.get('/user/isUserValid', {
            headers: {
                authorization: `Bearer ${data}`
            }
        })
        console.log({ res })
        return true
    } catch (error) {
        localStorage.clear()
        return false
    }
}


export const addTask = async ({ cookie, data }) => {
    try {
        console.log(cookie, data)
        const formData = new FormData();
        formData.append('taskName', data.taskName);
        formData.append('projectId', data.projectId);
        formData.append('description', data.Description);
        formData.append('dueDate', data.dueDate);
        formData.append('attachedFile', data.file[0]);
        const res = await axios.post('/workspace/createTask', formData, {
            headers: { authorization: `Bearer ${cookie}` }
        })
        console.log(res)
        return res
    } catch (error) {
        console.log(error)
        return error
    }
}

export const fetchData = (namess) => {
    console.log(namess)
    return { name: 'workspace', namess }
}



