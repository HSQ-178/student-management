import axios from '../index'

const baseUrl = "/authcode"

export default {
    getAuthcode: (data) => {
        return axios({
            method: "POST",
            url: `${baseUrl}/getAuthcode`,
            data: data
        })
    }
}