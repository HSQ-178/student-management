<template>
  <div>
    <div class="p-3 text-xl" v-text="title" />
    <hr />
    <div class="py-1">
      <Tabs :tabs-list="tabsList" :tabs-index="tabsIndex" @click="curTabsIndex"></Tabs>
    </div>
    <div>
      <!-- 签到 -->
      <div v-if="showIndex === 0">
        <transition name="left" appear>
            <div>
                <signInBtn :signInBtn-list="signInBtnList" :sign-in-index="signInIndex" @click="curSignInIndex"></signInBtn>
            </div>
        </transition>
      </div>
      <!-- 作业 -->
      <div v-else-if="showIndex === 1">我是作业</div>
      <!-- 考试 -->
      <div v-else-if="showIndex === 2">我是考试</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Tabs from "./components/Tabs.vue";
import signInBtn from './components/SignInBtn.vue'
import router from '../../router/index'

const title = ref("首页");
const tabsList = [{ text: "签到" }, { text: "作业" }];
const tabsIndex = ref(0);
const showIndex = ref(0);

const curTabsIndex = (index) => {
  tabsIndex.value = index;
  showIndex.value = tabsIndex.value;

  if (showIndex.value === tabsIndex.value) {
    return;
  }
};

const signInBtnList = [
  {
    icon: "i-material-symbols:check-box-outline-rounded",
    title: "手动签到",
    text: "在规定时间内手动签到",
    path: "/handSignIn",
  },
  {
    icon: "i-material-symbols:qr-code-2",
    title: "二维码签到",
    text: "使用扫描二维码进行签到",
    path: "/qrcodeSignIn",
  },
  {
    icon: "i-material-symbols:add-a-photo-outline",
    title: "签到码签到",
    text: "使用老师提供的签到码进行签到",
    path: "/authcodeSignIn",
  },
];
const signInIndex = ref(0)
const curSignInIndex = (index) => {
    signInIndex.value = index
    router.replace(signInBtnList[index].path)
}
</script>

<style scoped>
.left-enter-active,
.left-leave-active {
  transition: all 1s;
}

.left-enter-from {
  opacity: 0;
  transform: translateX(50%);
}

.right-enter-active,
.right-leave-active {
  transition: all 1s;
}

.right-enter-from {
  opacity: 0;
  transform: translateX(-50%);
}
</style>
