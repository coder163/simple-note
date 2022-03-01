<template>
  <div class="menu-bar">
    <div>
      <img class="logo" src="@/assets/logo.png" />
      <!-- 简单笔记 -->
    </div>
    <ol id="nav-list">
      <li>
        <font-awesome-icon icon="angle-down" />
      </li>
      <li>
        <font-awesome-icon :icon="['fas', 'minus']"   @click="windowOperation('minimize')" />
      </li>
      <li>
        <!-- <font-awesome-icon :icon="['far', 'window-maximize']" /> -->
        <font-awesome-icon :icon="maximizeIcon" @click="windowOperation('maximize')" />
      </li>
      <li>
        <font-awesome-icon icon="xmark"  @click="windowOperation('close')"/>
      </li>
    </ol>
  </div>
</template>
<script lang="ts" setup>

 import {ChannelMessage} from "@/main/domain/message";
import { ref } from "vue";
 const { ipcRenderer} = window.require("electron");
 
 let maximizeIcon=ref(['far', 'window-restore'])

   /**
   * 窗口操作
   */
 function windowOperation(operation: string): void {
   
      if(operation==='maximize' ){
        //标题栏双击最大化触发不了
        if( maximizeIcon.value[1]==='window-maximize'){
           maximizeIcon.value=['far', 'window-restore']
        }else{
           maximizeIcon.value=['far', 'window-maximize']
        }
      }
      ipcRenderer.send(ChannelMessage.WINDOW_OPERATION,operation);

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
  /* box-shadow: 12px 12px 15px #000; */
  -webkit-app-region: drag;
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
  /* outline: 1px solid #ccc; */
  /* background-color: #0f0; */
  width: 40px;
  text-align: center;
}

#nav-list li:hover {
  background-color: #dadada;
}
</style>
