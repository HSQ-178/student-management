import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
    //持久化
    persist: true,

    state: () => ({
        user: {
            grade: "",
            college: "",
            major: "",
            name: "",
            studentCard: "",
            class: ""
        }
    }),

    actions: {
        setUser(user) {
            this.user = user
        },

        updated(user) {
            for(let key in user) {
                this.user[key] = user[key]
            }
        },

        clear() {
            this.user = {
                major: "",
                college: "",
                name: "",
                studentCard: "",
                class: ""
            }
        }
    }
})