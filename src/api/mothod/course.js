import axios from "../index";

const baseURL = "/course"

export default {
    findAllCourse: (data) => {
        return axios({
            method: "POST",
            url: `${baseURL}/getAllCourse`,
            data: data
        })
    }
}