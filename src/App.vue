<template>

    <nav-top></nav-top>
    <split-panel :style="{'height':winHeight+'px'}" :default-width="240">
    <template v-slot:before>
       <div class="app-side">
            <side></side>

           <div id="toc"></div>
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
import NavTop from './views/NavTop.vue';
import Side from './views/Side.vue';
import { onMounted, ref } from 'vue';

let winHeight= ref<number>(document.documentElement.clientHeight-35)

onMounted(()=>{
     window.addEventListener(
      'resize',
      function () {
       winHeight.value = document.documentElement.clientHeight-35
       console.log(winHeight.value);
      },
      false
    )
})
</script>

<style lang="scss">
    .app-side{
        display:flex;
        height:100%;
        background-color: #ebedef;
    }

    #toc{
        .toc-item:hover{
            cursor:pointer;
            color: #007acc;
        }
    }

</style>
