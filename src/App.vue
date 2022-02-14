<template>
  <div class="layout-header">
    <div class="menu-bar">
      <img class="logo" src="@/assets/logo.png" />

      <ol id="nav-list">
        <li>
          <font-awesome-icon icon="angle-down" />
        </li>
        <li>
          <font-awesome-icon :icon="['fas', 'minus']" />
        </li>
        <li>
          <!-- <font-awesome-icon :icon="['far', 'window-maximize']" /> -->
          <font-awesome-icon :icon="['far', 'window-restore']" />
        </li>
        <li>
          <font-awesome-icon icon="xmark" />
        </li>
      </ol>
    </div>
  </div>
  <div class="layout-main">
    <div class="layout-content">
      <!-- <router-view /> -->
      <codemirror-editor></codemirror-editor>
    </div>
    <div class="layout-side-left">
      <div class="layout-side-left-menu">
        <div class="layout-side-left-menu-item actvie" style="">
          <!-- <font-awesome-icon icon="bars" size="xs" /> -->
          <span>目录</span>
        </div>

        <div class="layout-side-left-menu-item">
          <span>资源</span>
          <!-- <font-awesome-icon icon="cloud-arrow-down" size="xs" /> -->
        </div>
        <div class="layout-side-left-menu-item">
          <!-- <font-awesome-icon icon="rss" /> -->
          <span>阅读</span>
        </div>
      </div>
    </div>
    <!-- <div class="layout-side-right">
      右侧
    </div> -->
  </div>
</template>
<script setup lang="ts">
import CodemirrorEditor from "./components/CodemirrorEditor.vue";
</script>
<style lang="scss"></style>
