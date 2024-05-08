<template>
    <div>
        <div class="absolute left-7% top-5% w-80 h-150 bg-white rounded-5">
            <n-form class="p-4" ref="formList" :model="formList" :rules="rules">
                <n-form-item label="年级: " show-require-mark>
                    <n-input v-model:value="formList.grade" placeholder="请输入年级" />
                </n-form-item>
                <n-form-item label="学院: " show-require-mark>
                    <n-input v-model:value="formList.college" placeholder="请输入学院" />
                </n-form-item>
                <n-form-item label="专业: " show-require-mark>
                    <n-input v-model:value="formList.major" placeholder="请输入专业" />
                </n-form-item>
                <n-form-item label="班级: " show-require-mark>
                    <n-input v-model:value="formList.class" placeholder="请输入班级" />
                </n-form-item>
                <n-form-item label="学号: " show-require-mark>
                    <n-input v-model:value="formList.studentCard" placeholder="请输入学号" />
                </n-form-item>
                <n-form-item label="姓名: " show-require-mark>
                    <n-input v-model:value="formList.name" placeholder="请输入姓名" />
                </n-form-item>
            </n-form>

            <div>
                <n-button @click="Login" class="absolute left-40% text-sm" strong secondary type="info">
                    登录
                </n-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { createDiscreteApi } from "naive-ui"
import loginApi from '../../api/mothod/login'
import { useUserStore } from '../../store/userStore';
import router from '../../router/index';

const { message } = createDiscreteApi(["message"])
const userStore = useUserStore();

const formList = ref({
    grade: "",
    college: "",
    major: "",
    class: "",
    studentCard: "",
    name: "",
})

const rules = {
    grade: [
        {
            required: true,
            validator(rule, value) {
              if (!value) {
                return new Error("需要输入年级");
              }  
              return true
            },
            message: "请输入正确的年级",
            trigger: ["input", "blur"],
        }
    ],
    college: [
        {
            required: true,
            message: "请输入正确的学院",
            trigger: ["input", "blur"],
        }
    ],
    major: [
        {
            required: true,
            message: "请输入正确的专业",
            trigger: ["input", "blur"],
        }
    ],
    class: [
        {
            required: true,
            message: "请输入正确的班级",
            trigger: ["input", "blur"],
        }
    ],
    studentCard: [
        {
            required: true,
            message: "请输入正确的学号",
            trigger: ["input", "blur"],
        }
    ],
    name: [
        {
            required: true,
            message: "请输入正确的姓名",
            trigger: ["input", "blur"],
        }
    ]
}

const Login = async() => {
    const validateForm = () => {
        return new Promise((resolve, reject) => {
            formList.value?.validate((errors) => {
                if (errors) {
                    reject(errors)
                } else {
                    resolve()
                }
            })
        })
    }
    try {
        await validateForm()
        const { data } = await loginApi.login({
            grade: formList.value.grade,
            college: formList.value.college,
            major: formList.value.major,
            class: formList.value.class,
            studentCard: formList.value.studentCard,
            name: formList.value.name
        })
        console.log(data.data);
        if (data.code === 200) {
            userStore.user.grade = data.data.grade
            userStore.user.college = data.data.college
            userStore.user.major = data.data.major
            userStore.user.name = data.data.name
            userStore.user.studentCard = data.data.studentCard
            userStore.user.class = data.data.class

            message.success("登录成功")
            setTimeout(() => router.push("/"), 1000);
        } else if (data.code === 401) {
            message.info(data.msg)
        } else if (data.code === 400) {
            message.error(data.msg)
        }
    } catch (error) {
        if (Array.isArray(error)) {
            console.log(error);
            message.error("登陆失败，表单验证不通过")
        } else {
            console.log(error);
            message.error("登陆失败，发生其他错误")
        }
    }
} 

</script>

<style scoped>
</style>