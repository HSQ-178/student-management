import axios from '../index'

const baseURL = "/record"

export default {
    handSignIn: (data) => {
        return axios({
            method: "POST",
            url: `${baseURL}/addRecords`,
            data: data
        })
    }
}