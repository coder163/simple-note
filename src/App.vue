<template>
  <div class="layout-header">
    <nav-top></nav-top>
  </div>
  <button @click="stretch">伸缩测试</button>

  <div class="layout-container" ref="splitPane">
    <div
      :class="{ transition: istransition }"
      class="panel panel-1"
      :style="{ width: panelWidth }"
    >
      1
    </div>
    <div class="panel-trigger">
      <div class="after" @mousedown="handleMouseDown">0</div>
    </div>
    <div class="panel panel-2">2</div>
  </div>
</template>
<script setup lang="ts">
import CodemirrorEditor from "./components/CodemirrorEditor.vue";
import NavTop from "./views/NavTop.vue";
import Side from "./views/Side.vue";
import { onMounted, ref, computed } from "vue";
import SplitePanel from "./components/SplitePanel.vue";

let splitPane = ref<HTMLElement | null>();
// 滑动器宽度 （px）
let triggerLength: number = 10;

let width = ref(300);
let hello = ref<any>();
let istransition = ref(false);

let panelWidth = computed(() => {
  return `${width.value}px`;
});

function stretch() {
  istransition.value = true;
  if (width.value == 40) {
    width.value = 300;
  } else {
    width.value = 40;
  }
}

function handleMouseDown(e: MouseEvent) {
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
}
function handleMouseMove(e: MouseEvent) {
  //禁用动画
  istransition.value = false;
  let clientRect: DOMRect | undefined = splitPane.value?.getBoundingClientRect();
  if (clientRect) {
    let offset = e.pageX - clientRect.left + triggerLength / 2;
    width.value = offset;
  }
}

function handleMouseUp() {
  document.removeEventListener("mousemove", handleMouseMove);
}
</script>
<style lang="scss">
.layout-container {
  width: 100%;
  height: 300px;
  display: flex;
  //行
  flex-direction: row;
  //不换行
  flex-wrap: nowrap;
  background: #ccc;
  //没啥用
  .panel {
    color: #fff;
    font-size: 18px;
    text-align: center;
  }
  .panel-1 {
    background: #f00;
    min-width: 40px;
  }
  .panel-2 {
    background: #0f0;
    flex: 1;
  }
  .panel-3 {
    background: #00f;
    width: 200px;
  }
}

.panel-trigger {
  height: 100%;
  width: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .after {
    width: 100%;
    line-height: 30px;
    background: #aa0;
    cursor: col-resize;
    text-align: center;
  }
}
.transition {
  transition: width 500ms;
}
</style>
