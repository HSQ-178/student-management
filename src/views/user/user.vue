<template>
  <div>
    <div class="flex justify-between">
      <div class="p-3 text-xl" v-text="title"></div>
      <div v-if="loggedOutDisplay">
        <n-button @click="LogOff" class="mt-2 mr-3" strong secondary type="error">退出登录</n-button>
      </div>
    </div>
    <hr />

    <transition name="left" appear>
      <div class="relative mt-5">
        <div class="absolute left-7% w-80 h-50 bg-white rounded-5">
          <div class="absolute left-40% top-20%">
            <img rounded-full w-20 h-20 src="../../assets/微信头像.jpg" />
            <div v-if="loggedInDisplay" class="mt-3">
              <n-button @click="ToLogin" class="text-sm" type="info">请登录</n-button>
            </div>
  
            <div v-if="loggedOutDisplay" class="p-3 text-sm">{{ userStore.user.name }}</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";
import router from "../../router/index";
import { computed } from "vue";
import { useUserStore } from '../../store/userStore'

const title = ref("个人");
const userStore = useUserStore()

const loggedInDisplay = computed(() => {
    return userStore.user.studentCard == "" && userStore.user.name == ""
})

const loggedOutDisplay = computed(() => {
    return userStore.user.studentCard != "" || userStore.user.name != ""
})

const ToLogin = () => {
  router.push("/login");
};

const LogOff = () => {
    setTimeout(() => {
        //清空
        userStore.clear()
        router.push('/login')
    }, 1000);
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
