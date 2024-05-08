import courseApi from '../../api/mothod/course'
import { ref } from 'vue'
import { useUserStore } from '../../store/userStore'
import { useCourseStore } from "../../store/courseStore"
import { formateTime } from '../../utils/formateDate'

export const courseList = ref({
    grade: "",
    major: "",
    college: "",
    classes: "",
    course: "",
    startTime: "",
    teacherCard: ""
})

export const findCourseChange = async() => {
    const userStore = useUserStore()
    const courseStore = useCourseStore()
    const { data } = await courseApi.findAllCourse({
        grade: userStore.user.grade,
        college: userStore.user.college,
        major: userStore.user.major
    })

    if(data.code === 200) {
        data.data.courseResp.forEach((item, index) => {
            //将时间格式化为"hh:mm:ss"
            const startTime = formateTime(new Date(item.startTime));
            const endTime = formateTime(new Date(item.endTime));
            const courseWeek = new Date(item.startTime).getDay(); //获取星期数
            const courseYear = new Date(item.startTime).getFullYear()

            //获取当前时间, 将当前时间格式化为"hh:mm:ss"
            const dateTime = formateTime(new Date());
            const dateWeek = new Date().getDay(); //获取当前星期数
            const dateYear = new Date().getFullYear()
            // console.log(courseWeek);

            //判断
        if(courseYear === dateYear) {
            if (courseWeek === dateWeek) {
              if (startTime <= dateTime && dateTime <= endTime) {
                courseStore.course.id = item.id
                courseStore.course.grade = item.grade
                courseStore.course.major = item.major
                courseStore.course.college = item.college
                courseStore.course.course = item.course
                courseStore.course.class = item.class
                courseStore.course.startTime = item.startTime
                courseStore.course.endTime = item.endTime
                courseStore.course.teacherCard = item.teacherCard
                console.log(`现在${item.course}课`);
                console.log(item);
              }
              return;
            }
            return;
          }
        })
    } else {
        console.log("请求出错");
    }
}