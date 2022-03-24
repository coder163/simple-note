<template>
  <!-- <nav-top></nav-top> -->
  <split-panel :style="{ height: winHeight + 'px' }" v-bind:default-width="defaultWidth">
    <template v-slot:before>
      <div class="app-side">
        <side @actvie="actvieIcon"></side>
        <!-- <div :class="{ hide: isHide }"> -->
        <router-view></router-view>
        <!-- </div> -->
      </div>
    </template>
    <template v-slot:after>
      <codemiirror-editor></codemiirror-editor>
    </template>
  </split-panel>
</template>

<script setup lang="ts">
import SplitPanel from "./components/SplitPanel.vue";
import CodemiirrorEditor from "./components/CodemirrorEditor.vue";

// import NavTop from "./views/NavTop.vue";
import Side from "./views/Side.vue";

import { onMounted, ref } from "vue";

let winHeight = ref<number>(document.documentElement.clientHeight);
let isHide = ref<boolean>(false);

let defaultWidth = ref<number>(240);
onMounted(() => {
  window.addEventListener(
    "resize",
    function () {
      winHeight.value = document.documentElement.clientHeight;
    },
    false
  );
});

function actvieIcon(label: string, curLabel: string) {
  defaultWidth.value = defaultWidth.value === 240 && label === curLabel ? 0 : 240;
}
</script>

<style lang="scss">
.app-side {
  display: flex;
  height: 100%;
  background-color: #ebedef;
}

.hide {
  display: none;
}
</style>
