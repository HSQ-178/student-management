<template>
  <div class="flex">
    <div
      v-for="(item, index) in props.tabsList"
      :key="index"
      @click="emit('click', index)"
    >
      <div
        class="ml-4"
        :class="index === props.tabsIndex ? 'color-indigo-5' : 'color-gray-6'"
      >
        {{ item.text }}
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  tabsList: Array,
  tabsIndex: Number,
});
const emit = defineEmits(["click"]);
</script>
