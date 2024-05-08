import axios from 'axios'

const instance = axios.create({
    baseURL: "http://localhost:8082/api",
    // baseURL: "http://192.168.22.77:8082/api",
    timeout: 20000
})

export default instance;