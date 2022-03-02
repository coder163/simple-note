<template>
    <div id="div-tree">
        <ul class="tree-list">
          <!--TODO 依然没有下级菜单的数据 -->
            <tree-item @expand-node="expandNode" v-for="item in nodes" :nodes="nodes"></tree-item>
        </ul>
    </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from "vue";
import TreeItem from "./TreeItem.vue";
 const { ipcRenderer} = window.require("electron");
const nodes =ref();
  nodes.value=[
        {
            label:'测试数据1',
            id: 1,
            expand: false,
            child:[
                {
                label:'测试数据1-1',
                id: 1,
                child:[{}]
                },
                 {
                label:'测试数据1-2',
                id: 1,
                child:[]
                }

            ]
        }

  ]
onMounted(()=>{
  
       ipcRenderer.on('open-dir',function(event: any,args:any){
           // nodes.value= args;
       })
})
function expandNode(curItem:any){
   
    //已经展开的话什么都不做
    if(curItem.expand){
        return ;
    }
    reset(nodes.value);
    curItem.expand=true;
}
function reset(list:Array<any>){
    //@ts-i
   list.forEach((value,index)=>{
        value.expand=false;

        if(value.child){
           reset(value.child);
        }
    })
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
    .item:hover {
        background-color: #e0e4e6;
        opacity: 0.8;
        cursor: pointer;
    }
}
.item-active {
    background-color: #c7cbd1 !important;
}
</style>