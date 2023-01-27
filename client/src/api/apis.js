import { GiConsoleController } from "react-icons/gi"
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



export const userDetails = async (cookie) => {
    const res = await axios.get('/user/userDetails', {
        headers: {
            authorization: `Bearer ${cookie}`
        }
    })
    console.log(res.data.data)
    return res.data.data
}



