<template>
  <div
    v-for="(item, index) in props.signInBtnList"
    :key="index"
    @click="emit('click', index)"
  >
    <div class="p-3 m-3 item-center bg-white rounded-1 shadow-sm">
      <div class="flex">
        <div class="mt-1 text-6 color-indigo-7" :class="item.icon" />
        <div class="ml-3">
          <div class="text-5">{{ item.title }}</div>
          <div class="text-3 color-gray-4">{{ item.text }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  signInBtnList: Array,
  signInIndex: Number,
});
const emit = defineEmits(["click"]);
</script>
