<template>
  <!-- <nav-top></nav-top> -->
  <split-panel :style="{ height: winHeight + 'px' }" :default-width="240">
    <template v-slot:before>
      <div class="app-side">
        <side></side>
        <tree v-bind:nodes="list" @selectedNode="openFile"></tree>
        <!-- -->
        <!-- <button @click="ch">aaa</button> -->
        <!-- <child v-bind:name="name"></child> -->
      </div>
    </template>
    <template v-slot:after>
      <codemiirror-editor v-bind:content="content"></codemiirror-editor>
    </template>
  </split-panel>
</template>

<script setup lang="ts">
import SplitPanel from "./components/SplitPanel.vue";
import CodemiirrorEditor from "./components/CodemirrorEditor.vue";
import Tree from "./components/tree/Tree.vue";
import child from "./child.vue";
import NavTop from "./views/NavTop.vue";
import Side from "./views/Side.vue";
import { onMounted, ref } from "vue";

const { ipcRenderer } = window.require("electron");
let name = ref("xiaoming");
let list = ref();
let content = ref();
let winHeight = ref<number>(document.documentElement.clientHeight);
//测试数据
ipcRenderer.send("init-dir", "/run/media/dancingcode/软件/创作笔记/研修堂");

onMounted(() => {
  ipcRenderer.on("open-dir", function (event: any, args: any) {
    console.log(args);
    list.value = args;
  });
  ipcRenderer.on("read-file", function (event: any, args: any) {
    content.value = args;
  });

  ipcRenderer.on("open-child-dir", function (event: any, id: any, fileList: any) {
    for (let i = 0; i < list.value.length; i++) {
      if (list.value[i].id === id) {
        list.value[i].child = fileList;
      }
    }
  });

  window.addEventListener(
    "resize",
    function () {
      winHeight.value = document.documentElement.clientHeight;
      // console.log(winHeight.value);
    },
    false
  );

  let toc = document.querySelector("#toc");
  if (toc) {
    toc.addEventListener("contextmenu", (ev) => {
      // 阻止默认行为
      ev.preventDefault();
      // 获取鼠标位置
      const client = {
        //@ts-ignore
        x: ev.clientX,
        //@ts-ignore
        y: ev.clientY,
      };
      // 把鼠标位置发送到主进程
      ipcRenderer.send("menu", client);
    });
  }
});
function ch() {
  console.log("ch");
  name.value = "xiaoming001";
  list.value = [
    {
      label: "测试数据3",
      id: 1,
      expand: true,

      child: [
        {
          label: "测试数据3-1",
          id: 1,
        },
        {
          label: "测试数据3-2",
          id: 1,
          selected: true,
        },
      ],
    },
  ];
}
function openFile(curItem: any) {
  console.log("父组件", curItem);

  let { path, id } = curItem;
  if (curItem.expand) {
    ipcRenderer.send("open-child-dir", path, id);
    return;
  }
  ipcRenderer.send("read-file", path);
}
</script>

<style lang="scss">
.app-side {
  display: flex;
  height: 100%;
  background-color: #ebedef;
}
#toc::-webkit-scrollbar {
  width: 11px;
  height: 11px;
}

#toc::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #4b5563;
  border: 1px solid transparent;
  background-clip: padding-box;
}
#toc {
  width: 100%;
  overflow-y: scroll;
  .toc-item:hover {
    cursor: pointer;
    color: #007acc;
  }
}
</style>
