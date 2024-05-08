import { defineStore } from "pinia";

export const useCourseStore = defineStore("course", {
    //持久化
    persist: true,

    state: () => ({
        course: {
            id: "",
            teacherCard: "",
            grade: "",
            college: "",
            major: "",
            class: "",
            course: "",
            startTime: "",
            endTime: ""
        }
    }),

    actions: {
        setCourse(course) {
            this.course = course
        },

        updateCourse(course) {
            for (let key in course) {
                this.course[key] = course[key]
            }
        },

        clear() {
            this.course = {
                id: "",
                teacherCard: "",
                grade: "",
                college: "",
                major: "",
                class: "",
                course: "",
                startTime: "",
                endTime: ""
            }
        }
    }
})