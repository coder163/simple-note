<template>
  <!-- <nav-top></nav-top> -->
  <split-panel :style="{ height: winHeight + 'px' }"  v-bind:default-width="240">
    <template v-slot:before>
      <div class="app-side">
        <side @actvie="actvieIcon"></side>

        <router-view></router-view>
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
  if (label === curLabel) {
    console.log("当前点击的是已经的激活的，需要隐藏树形菜单");
   
  }
}
</script>

<style lang="scss">
.app-side {
  display: flex;
  height: 100%;
  background-color: #ebedef;
}
</style>
