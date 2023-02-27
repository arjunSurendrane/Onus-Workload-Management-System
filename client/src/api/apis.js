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
        console.log(res)
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



export const fetchTaskData = async ({ id, cookie }) => {
    const res = await axios.get(`/workspace/task/${id}`, { headers: { authorization: `Bearer ${cookie}` } })
    console.log(res)
    if (res.data.status == 'success') {
        console.log({ task: res.data.task })
        return res.data.task

    }
}


export const changeStatus = async (id, status, cookie) => {
    const res = await axios.patch(`/workspace/changetaskstatus/${id}`, { status }, { headers: { authorization: `Bearer ${cookie}` } })
    if (res.data.status == 'success') {
        return res.data.status
    }
    console.log({ changeStatusError: res })

}

export const deleteTask = async (id, cookie) => {
    const res = await axios.delete(`/workspace/deleteTask/${id}`, { headers: { authorization: `Bearer ${cookie}` } })
    console.log({ responseInApi: res })
    if (res.status == 204) {
        return res
    }
}

export const changeTaskPrioriy = async (id, priority, cookie) => {
    const res = await axios.patch(`/workspace/changePriority/${id}`, { priority }, { headers: { authorization: `Bearer ${cookie}` } })
    console.log({ priority: res })
    if (res.data.status == 'success') {
        return res
    }
}

