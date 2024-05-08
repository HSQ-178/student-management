<template>
  <div class="p-3 text-xl" v-text="title" />
  <hr />
  <transition name="left">
    <div class="absolute left-20% top-20%">
      <n-form ref="formRef" inline label-placement="left">
        <n-form-item label="课程：">
          <n-input v-model:value="courseStore.course.course" placeholder="输入课程" disabled />
        </n-form-item>
      </n-form>
      <div class="absolute left-30% top-50">
          <n-button
            @click="signInChange"
            type="primary"
            class="w-20 h-20 text-white bg-indigo-4 rounded-full"
          >
            签到
          </n-button>
      </div>
    </div>
  </transition>
</template>

<script setup>
import handSignInApi from "../../../api/mothod/handSignIn";
import { formateTime, formateDate } from "../../../utils/formateDate";
import { findCourseChange } from "../findCourse";
import { useUserStore } from "../../../store/userStore";
import { useCourseStore } from "../../../store/courseStore";
import { ref } from "vue";
import { createDiscreteApi } from "naive-ui";

const userStore = useUserStore();
const courseStore = useCourseStore()
const title = ref("手动签到");
const { message } = createDiscreteApi(['message']);

const signInChange = async () => {
  //当前日期与上课时间进行拼接
  const createTime = new Date(
    formateDate(new Date()) + " " + formateTime(new Date(courseStore.course.startTime))
  ).toISOString();

  const { data } = await handSignInApi.handSignIn({
    teacherCard: courseStore.course.teacherCard,
    grade: courseStore.course.grade,
    college: courseStore.course.college,
    major: courseStore.course.major,
    courseId: courseStore.course.id,
    class: courseStore.course.class,
    studentCard: userStore.user.studentCard,
    name: userStore.user.name,
    createTime: createTime,
    status: 1,
  });

  if (data.code === 200) {
    message.success("签到成功");
  } else if (data.code === 401) {
    message.info(data.msg);
  } else if (data.code === 400) {
    message.error(data.msg);
  }
};

onMounted(() => {
  findCourseChange();
});
</script>

<style scoped>
.left-enter-active,
.left-leave-active {
  transition: all 1s;
}

.left-enter-from {
  opacity: 0s;
  transform: translateX(50%);
}

.n-button:focus {
  background-color: rgb(73, 133, 244);
}

.n-button:active {
  background-color: rgb(73, 133, 244);
}
</style>
