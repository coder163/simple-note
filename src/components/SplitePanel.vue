<template>
  <div ref="splitPane" class="split-pane" :class="direction">
    <div class="pane pane-before" :style="lengthType + ':' + paneLengthValue">
      <slot name="before"></slot>
    </div>

    <div
      class="pane-trigger"
      :style="lengthType + ':' + triggerLengthValue"
      @mousedown="handleMouseDown"
    ></div>

    <div class="pane pane-after">
      <slot name="after"></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";

export interface ISplitePanelProps {
  direction?: string;
  min?: number;
  max?: number;
  paneLengthPercent?: number;
  triggerLength?: number;
}

const props = withDefaults(defineProps<ISplitePanelProps>(), {
  min: 10,
  max: 90,
  paneLengthPercent: 50,
  triggerLength: 10,
  direction: "row",
});

const count = ref(1234);

// 区域1宽度 (%)
let paneLength = ref(50);

onMounted(() => {
  paneLength.value = props.paneLengthPercent;
});
let direction: any = "row";

let lengthType = computed(() => {
  return direction === "row" ? "width" : "height";
});

// 滑动器宽度 （px）
let triggerLength: number = 10;
// 鼠标距滑动器左(顶)侧偏移量
let triggerLeftOffset: number = 0;

let paneLengthValue = computed(() => {
  return `calc(${paneLength.value}% - ${triggerLength / 2 + "px"})`;
});

let triggerLengthValue = computed(() => {
  return triggerLength + "px";
});

let splitPane = ref<HTMLElement | null>();
//组件暴露自己的属性
// defineExpose({ paneLength });
//子组件向父组件事件传递
const emit = defineEmits(["update"]);

function handleMouseDown(e: MouseEvent) {
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
  if (direction === "row") {
    //@ts-ignore
    triggerLeftOffset = e.pageX - e.srcElement.getBoundingClientRect().left;
  } else {
    //@ts-ignore
    triggerLeftOffset = e.pageY - e.srcElement.getBoundingClientRect().top;
  }
}

// 按下滑动器后移动鼠标
function handleMouseMove(e: MouseEvent) {
  let clientRect: DOMRect | undefined = splitPane.value?.getBoundingClientRect();
  if (clientRect) {
    let percent = 0;
    if (direction === "row") {
      let offset = e.pageX - clientRect.left - triggerLeftOffset + triggerLength / 2;
      percent = (offset / clientRect.width) * 100;
    } else {
      let offset = e.pageY - clientRect.top - triggerLeftOffset + triggerLength / 2;
      percent = (offset / clientRect.height) * 100;
    }
    //边界
    if (percent < props.min || percent > props.max) {
      //   console.log("边界");
      return;
    }

    // console.log("拖动中");
    paneLength.value = percent;
    //触发事件
    emit("update", paneLength.value);
  }
}
// 松开滑动器
function handleMouseUp() {
  document.removeEventListener("mousemove", handleMouseMove);
}
</script>
<style lang="scss">
.split-pane {
  background: palegreen;
  height: 300px;
  display: flex;
  &.row {
    .pane {
      height: 100%;
    }
    .pane-trigger {
      height: 100%;
      cursor: col-resize;
    }
  }
  &.column {
    .pane {
      width: 100%;
    }
    .pane-trigger {
      width: 100%;
      cursor: row-resize;
    }
  }
  .pane-before {
    background: palevioletred;
  }
  .pane-trigger {
    user-select: none;
    background: palegoldenrod;
  }
  .pane-after {
    flex: 1;
    background: turquoise;
  }
}
</style>
