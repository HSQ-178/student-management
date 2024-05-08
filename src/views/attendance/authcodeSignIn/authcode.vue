<template>
  <div class="absolute left-1/2 top-70 transform -translate-x-1/2 -translate-y-1/2 flex">
    <input
      v-for="(code, index) in verificationCodes"
      :key="index"
      v-model="verificationCodes[index]"
      @input="handleInput(index, $event)"
      @keydown="handleKeyDown(index, $event)"
      maxlength="1"
      class="w-10 h-10 mr-3 text-center border-1 border-gray-3 focus:outline-none"
    />
  </div>
</template>
<script setup>
import { useCourseStore } from '../../../store/courseStore'
import { formateDateTime } from '../../../utils/formateDate'
import authcodeApi from '../../../api/mothod/authcode'
// import { findCourseChange } from "../findCourse";
import { ref, defineEmits, nextTick, onMounted } from 'vue';

const courseStore = useCourseStore();
const emits = defineEmits(['emailCode']);
const verificationCodes = ref(['', '', '', '', '']);
 
const handleInput = async(index, event) => {
  const value = event.target.value;
  verificationCodes.value[index] = value;
 
   // 检查验证码是否已完成
   if (verificationCodes.value.join('').length === 5) {
    const verificationCode = ref(verificationCodes.value.join(''));
    const response = await verifyAuthCode(verificationCode.value); // 等待请求完成

    if (response && response.data && response.data.code === 200) {
      emits('emailCode', response.data); // 验证成功
    }
  }
 
  // 自动跳到下一个输入框
  if (value && index < verificationCodes.value.length - 1) {
    const nextInput = event.target.nextElementSibling;
    if (nextInput) {
      nextTick(() => {
        nextInput.focus();
      });
    }
  }
};

const verifyAuthCode = async (authcode) => {
  try {
    const response = await authcodeApi.getAuthcode({
      teacherCard: courseStore.course.teacherCard,
      grade: courseStore.course.grade,
      college: courseStore.course.college,
      major: courseStore.course.major,
      class: courseStore.course.class,
      courseId: courseStore.course.id,
      authcode: authcode
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error("验证时出错:", error);
    return null;
  }
};


const handleKeyDown = (index, event) => {
  // 处理删除操作
  if (event.key === 'Backspace' && !event.target.value && index > 0) {
    const prevInput = event.target.previousElementSibling;
    if (prevInput) {
      nextTick(() => {
        prevInput.focus();
      });
    }
  }
}

// onMounted(() => {
//   findCourseChange();
// })
</script>

<style scoped>

</style>