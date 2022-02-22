<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />

    <splitpanes class="default-theme">
      <pane v-for="i in 3" :key="i">
        <div><HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /></div>
      </pane>
    </splitpanes>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
</script>
