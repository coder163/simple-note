<template>
  <div class="menu-bar">
    <div>
      <img class="logo" src="@/assets/logo.png" />
      <!-- 简单笔记 -->
    </div>
    <ol id="nav-list">
      <li @click="menu" id="main-menu">
        <font-awesome-icon icon="angle-down" />
      </li>
      <li>
        <font-awesome-icon
          :icon="['fas', 'minus']"
          @click="windowOperation('minimize')"
        />
      </li>
      <li>
        <!-- <font-awesome-icon :icon="['far', 'window-maximize']" /> -->
        <font-awesome-icon :icon="maximizeIcon" @click="windowOperation('maximize')" />
      </li>
      <li>
        <font-awesome-icon icon="xmark" @click="windowOperation('close')" />
      </li>
    </ol>
  </div>
</template>
<script lang="ts" setup>
import { ChannelMessage } from "@/main/domain/message";
import { ref } from "vue";
const { ipcRenderer } = window.require("electron");

let maximizeIcon = ref(["far", "square"]);

/**
 * 窗口操作 <font-awesome-icon icon="fa-light fa-square" />
 */
function windowOperation(operation: string): void {
  console.log(maximizeIcon.value[1]);
  if (operation === "maximize") {
    if (maximizeIcon.value[1] === "square") {
      maximizeIcon.value = ["fas", "window-restore"];
    } else {
      maximizeIcon.value = ["fas", "square"];
    }
  }
  ipcRenderer.send(ChannelMessage.WINDOW_OPERATION, operation);
}
function menu(ev: any): void {
  const client = {
    //@ts-ignore
    x: ev.clientX,
    //@ts-ignore
    y: ev.clientY,
  };
  // 把鼠标位置发送到主进程
  ipcRenderer.send("menu", client);
}
</script>

<style lang="css">
/*********************************顶部导航**********************************/

.menu-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  height: 35px;

  -webkit-app-region: drag;
  font-weight: 100 !important;
}

.logo {
  width: 20px;
  margin-left: 10px;
  height: auto;
  -webkit-app-region: no-drag;
}

#nav-list {
  display: flex;
  flex-wrap: nowrap;
  list-style-type: none;
  justify-content: space-around;
  /* width: 180px; */
  line-height: 35px;
  -webkit-app-region: no-drag;
  font-weight: 100 !important;
}

#nav-list li {
  width: 40px;
  text-align: center;
}

#nav-list li:hover {
  background-color: #dadada;
}
</style>
