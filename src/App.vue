<template>
  <div class="layout-header">
    <nav-top></nav-top>
  </div>
  <div class="layout-main">
    <div class="layout-content">
      <codemirror-editor></codemirror-editor>
    </div>
    <div class="layout-side-left">
      <side></side>
    </div>
    <div class="layout-side-right">
      <div style="width: 200px">右侧</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import CodemirrorEditor from "./components/CodemirrorEditor.vue";
import NavTop from "./views/NavTop.vue";
import Side from "./views/Side.vue";
</script>
<style lang="scss"></style>
