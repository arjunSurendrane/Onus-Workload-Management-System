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
        return false
    }
}

export const fetchData = (namess) => {
    console.log(namess)
    return { name: 'workspace', namess }
}



