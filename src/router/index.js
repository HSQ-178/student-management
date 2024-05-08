import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../store/userStore";
import { ElMessage } from "element-plus";

import Index from "../views/index/index.vue";
import Home from "../views/home/home.vue";
import User from "../views/user/user.vue";
import HandSignIn from '../views/attendance/handSignIn/handSignIn.vue'
import QrcodeSignIn from '../views/attendance/qrcodeSignIn/qrcodeSignIn.vue'
import AuthcodeSignIn from '../views/attendance/authcodeSignIn/authcode.vue'
import Login from '../views/user-by-login/index.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Index,
      children: [
        {
          path: "/",
          name: "Home",
          component: Home,
          meta: {
            index: 0,
          },
          
        },
        {
          path: "/user",
          name: "User",
          component: User,
          meta: {
            index: 1,
            needToken: true, //给路由加一个变量，用于判断是否需要登录
          },
        },
      ],
    },
    {
      path: "/handSignIn",
      name: "HandSignIn",
      component: HandSignIn
    },
    {
      path: "/qrcodeSignIn",
      name: "QrcodeSignIn",
      component: QrcodeSignIn
    },
    {
      path: "/authcodeSignIn",
      name: "AuthcodeSignIn",
      component: AuthcodeSignIn
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    }
  ],
});

router.afterEach((to, from) => {
  const toIndex = to.meta.index;
  const fromIndex = from.meta.index;

  to.meta.transition = toIndex > fromIndex ? "slide-left" : "slide-right";
});

// router钩子函数
router.beforeEach((to, from) => {
  const userStore = useUserStore();

  if (
    to.meta?.needToken && 
    userStore.user.studentCard == "" && 
    userStore.user.name == ""
  ){
      //如果有message，可以以下
      ElMessage.warning("请先登录")

      setTimeout(() => {
          router.push("/login")
      },1000)
  }
})

export default router;
