<template>
  <div>
    <div>
      <router-view v-slot="{ Component, route }">
        <transition :name="route.meta.transition || 'fade'" mode="default">
          <component :is="Component" class="w-screen" />
        </transition>
      </router-view>
    </div>
    <!-- 底部tabbar -->
    <div>
      <Tabbar
        :table-list="tableList"
        :cur-selected-index="tableIndex"
        @click="changeSelectIndex"
      ></Tabbar>
    </div>
  </div>
</template>

<script setup>
import Tabbar from "../../components/Tabbar.vue";
import router from "../../router/index";
import { ref } from "vue";

const tableIndex = ref(0);
const tableList = [
  {
    icon: "i-material-symbols:home-outline-rounded",
    title: "首页",
    path: "/",
  },
  {
    icon: "i-material-symbols:account-circle-outline",
    title: "我的",
    path: "/user",
  },
];

const changeSelectIndex = (index) => {
  tableIndex.value = index;
  router.replace(tableList[index].path);
};
</script>
