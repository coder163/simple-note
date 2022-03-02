<template>
    <!-- <nav-top></nav-top> -->
    <split-panel :style="{ 'height': winHeight + 'px' }" :default-width="240">
        <template v-slot:before>
            <div class="app-side">
                <side></side>
                <tree></tree>
                
            </div>
        </template>
        <template v-slot:after>
            <codemiirror-editor></codemiirror-editor>
        </template>
    </split-panel>
</template>


<script setup lang="ts">
import SplitPanel from './components/SplitPanel.vue';
import CodemiirrorEditor from './components/CodemirrorEditor.vue'
import Tree from './components/tree/Tree.vue'

import NavTop from './views/NavTop.vue';
import Side from './views/Side.vue';
import { onMounted, ref } from 'vue';

const { ipcRenderer} = window.require("electron");





let winHeight = ref<number>(document.documentElement.clientHeight)

onMounted(() => {
    window.addEventListener(
        'resize',
        function () {
            winHeight.value = document.documentElement.clientHeight
            console.log(winHeight.value);
        },
        false
    )

    let toc=document.querySelector("#toc");
    if(toc){
         toc.addEventListener('contextmenu', ev => {
      // 阻止默认行为
      ev.preventDefault();
      // 获取鼠标位置
      const client = {
            //@ts-ignore
        x: ev.clientX,
            //@ts-ignore
        y: ev.clientY
      };
      // 把鼠标位置发送到主进程
      ipcRenderer.send('menu', client);
    });
    }
   
})
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
  background-color: #4B5563;
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
