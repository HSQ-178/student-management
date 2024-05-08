<template>
  <div class="relative h-screen w-screen">
    <QrcodeStream 
        @error="onError" 
        @detect="onDetect" 
        :track="paintBoundingBox"
        :paused="paused"
        >
    </QrcodeStream>
  </div>
</template>

<script setup>
import { QrcodeStream } from "vue-qrcode-reader";
import { createDiscreteApi } from "naive-ui"
import { ref } from "vue";

const { message } = createDiscreteApi(["message"])
const result = ref("");
const paused = ref(false);
const signResult = ref(null);

// 二维码识别
const onDetect = (detectedCodes) => {
  result.value = JSON.stringify(detectedCodes.map((code) => code.rawValue));

  paused.value = true;
};

// 摄像头错误
const onError = (error) => {
    if (error === 'NotAllowedError') {
    message.error("请允许浏览器使用摄像头")
  } else if (error === 'NotFoundError') {
    message.error("未找到摄像头")
  } else if (error === 'NotSupportedError') {
    message.error("浏览器不支持摄像头");
  } else if (error === 'NotReadableError') {
    message.error("摄像头不可读");
  } else if (error === 'OverconstrainedError') {
    message.error("摄像头无法满足要求");
  } else if (error === 'StreamApiNotSupportedError') {
    message.error("浏览器不支持摄像头");
  }  else {
    message.error("摄像头异常");
  } 
}

// 绘制边框
const paintBoundingBox = (detectedCodes, ctx) => {
  for (const detectedCode of detectedCodes) {
    const {
      boundingRect: { x, y, width, height },
    } = detectedCode;
  }

  ctx.lineWidth = 2;
  ctx.strokeStyle = "#ffc107";
  ctx.strokeRect(x, y, width, height);

  console.log(ctx);
  console.log(detectedCodes);
};
</script>

<style scoped></style>
