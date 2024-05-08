<template>
  <div class="w-full absolute left-0 bottom-0 py-2 bg-indigo-3 rounded-4 overflow-hidden">
    <div class="flex justify-around items-center h-10">
      <div
        class="flex px-3 py-1 items-center text-white font-bold z-100 rounded-xl transition-all duration-300"
        :class="[
          index === props.curSelectedIndex ? 'bg-indigo-5 rounded-md' : 'bg-indigo-3',
        ]"
        v-for="(item, index) in props.tableList"
        :key="index"
        @click="emit('click', index)"
      >
        <div class="text-3xl" :class="item.icon" />
        <div
          class="text-ml transition-all duration-300"
          :class="
            index === props.curSelectedIndex
              ? 'opacity-100'
              : 'opacity-0 -translate-x-1/2'
          "
        >
          {{ index === props.curSelectedIndex ? item.title : "" }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  tableList: Array,
  curSelectedIndex: Number,
});

const emit = defineEmits(["click"]);
</script>
