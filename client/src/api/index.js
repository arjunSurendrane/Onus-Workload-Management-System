import axios from 'axios'

const url = "http://localhost:4000/api"


const instance = axios.create({
    baseURL: url
});

export default instance
