import axios from "../index"

const baseURL = "/student"

export default {
    //登录
    login: (data) => {
        return axios({
            method: "POST",
            url: `${baseURL}/login`,
            data: data
        })
    }
}