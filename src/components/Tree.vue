<template>
  <div id="div-tree">
    <ul class="tree-list">
      <li class="item" v-for="(item, index) in nodes" :key="index">
        <div
          class="mode"
          :class="{ 'item-active': item.selected }"
          @click="expandNode(item)"
        >
          <font-awesome-icon :icon="getIcon(item)" />
          <span class="item-name">{{ item.label }}</span>
        </div>
        <tree
          :nodes="item.child"
          v-if="item.hasChildren && item.expand"
          @selectedNode="outExpandNode"
        ></tree>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";

const emit = defineEmits(["selectedNode", "selectedNode1"]);

const props = defineProps({
  nodes: null,
});

let list = ref<any>();

onMounted(() => {
  list.value = props.nodes;
});
function expandNode(curItem: any) {
  emit("selectedNode", curItem);
}
function outExpandNode(curItem: any) {
  emit("selectedNode", curItem);
}
function getIcon(item: any) {
  if (item.hasChildren) {
    if (item.expand) {
      return ["far", "folder-open"];
    }
    return ["fas", "folder-plus"];
  }
  return ["far", "file-lines"];
}
</script>
<style lang="scss">
#div-tree {
  width: 100%;
  // background-color: #0fa;
}
.tree-list {
  // background-color: #0cc;
  margin-left: 10px;
  .item {
    line-height: 30px;
    .item-name {
      margin-left: 10px;
    }
    .svg-inline--fa {
      color: #72787e;
    }
  }
  .mode:hover {
    background-color: #e0e4e6;
    opacity: 0.8;
    cursor: pointer;
  }
}
.item-active {
  background-color: #c7cbd1 !important;
}
</style>
