<template>
  <div id="tree-view">
    <tree :nodes="list" @selected-node="selectedNode"></tree>
  </div>
</template>

<script lang="ts" setup>
import Tree from "@/components/Tree.vue";
import { onMounted, ref } from "vue";
import FileUtil from "../main/utils/FileUtil";
import { useStore } from "vuex";
const store = useStore();
const { ipcRenderer } = window.require("electron");
let list = ref();
ipcRenderer.on("list-dir-reply", (event: Electron.IpcRendererEvent, path: any) => {
  list.value = FileUtil.listFiles(path);
  store.commit("updateTreeList", list.value);
});
onMounted(() => {
  let treeList = store.getters.getTreeList;
  //初始路径
  if (treeList == null || treeList.length == 0) {
    // list.value = FileUtil.listFiles("D:\\笔记整理");
    // store.commit("updateTreeList", list.value);
  }
  list.value = treeList;
});

function selectedNode(curItem: any) {
  // console.log(curItem)
  reset(list.value);

  curItem.selected = true;

  if (curItem.hasChildren) {
    let files = FileUtil.listFiles(curItem.path);
    curItem.child = files;
    curItem.expand = !curItem.expand;
    return;
  }
  // //通过vuex获取编辑器对象
  if (!curItem.hasChildren) {
    ipcRenderer.send("read-file", curItem.path);
  }
  store.commit("updateTreeList", list.value);
}
function reset(list: Array<any>) {
  //@ts-i
  list.forEach((value, index) => {
    value.selected = false;
    // value.expand = false;
    if (value.child) {
      reset(value.child);
    }
  });
}
</script>
<style lang="scss">
#tree-view {
  width: 100%;
  overflow-y: scroll;
}
</style>
