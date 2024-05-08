import axios from '../../index'

const baseURL = "/attendance"
const baseURL2 = "/release"

export default {
    //根据年级，专业和学号查询该学生的课程
    findCourseByGradeAndMajorAndStudentId: (data) => {
        return axios({
            method: "GET",
            url: `${baseURL}/findCourseByGradeAndMajorAndStudentId`,
            params: {
                grade: data.grade,
                major: data.major,
                studentId: data.studentId
            }
        })
    },

    //将签到的信息存到记录表表示已签到成功
    signIn: (data) => {
        return axios({
            method: "POST",
            url: `${baseURL2}/signIn`,
            data: data
        })
    }
}