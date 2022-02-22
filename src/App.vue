<template>
  <div class="layout-header">
    <nav-top></nav-top>
  </div>

  <splite-panel :max="100" :min="3" :paneLengthPercent="10" @update="update" ref="hello">
    <template v-slot:before>
      <div id="layout-side-left-menu">
        <side @actvie="actvie" ref="side"></side>
      </div>
      <!-- FIXME 伸缩面板 -->
      <div class="nav-tree" ref="iconTool">iconTool</div>
    </template>
    <template v-slot:after>
      <splite-panel :max="90" @update="update" :paneLengthPercent="90" ref="hello">
        <template v-slot:before>
          <codemirror-editor></codemirror-editor>
        </template>
        <template v-slot:after> 大纲 </template>
      </splite-panel>
    </template>
  </splite-panel>
</template>
<script setup lang="ts">
import CodemirrorEditor from "./components/CodemirrorEditor.vue";
import NavTop from "./views/NavTop.vue";
import Side from "./views/Side.vue";

import { onMounted, ref, computed } from "vue";
import SplitePanel from "./components/SplitePanel.vue";

const side = ref<any>();
let iconTool = ref<any>();
let hello = ref();

onMounted(() => {
  iconTool = ref(document.querySelector(".nav-tree"));
});
function actvie(label: string, actvieLabel: string) {
  console.log("actvie", actvieLabel, label);
}
//获取子组件中的属性
function update(width: number) {
  console.log("update", width);
  // hello.value.count = 100;
  // console.log(hello.value.count);
}
</script>
<style lang="scss"></style>
