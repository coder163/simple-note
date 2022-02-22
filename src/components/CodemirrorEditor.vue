<template>
  <!-- <div id="tool-bar" style="background: #5f5e5e; height: 5%; font-size: 25px">
    <font-awesome-icon :icon="['far', 'eye']" />
  </div> -->
  <div class="home" style="height: 180px; background: #c0c">
    <textarea v-model="content" id="editor" placeholder="开始你的书写"></textarea>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, onMounted } from "vue";
//@ts-ignore
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/darcula.css";

import "codemirror/mode/gfm/gfm";
import "codemirror/mode/markdown/markdown";
import "codemirror/mode/clike/clike.js";
import "codemirror/addon/edit/continuelist.js";
import "codemirror/addon/selection/active-line.js";

import "codemirror/addon/edit/closetag.js"; //闭合标签
import "codemirror/addon/display/placeholder.js";

let content: string = "";

onMounted(() => {
  let codemirrorEditor = CodeMirror.fromTextArea(
    //@ts-ignore
    document.getElementById("editor"),
    {
      lineWrapping: true, //代码折叠
      viewportMargin: Infinity,
      lineNumbers: true,
      mode: "gfm",
      theme: "darcula",
      matchBrackets: true, //括号匹配
      foldGutter: true,
      styleActiveLine: true, // 选中行高亮
      //md配置
      highlightFormatting: true,
      allowAtxHeaderWithoutSpace: true,
    }
  );

  // codemirrorEditor.addKeyMap({
  //   'Ctrl-1':
  // })
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css">
.CodeMirror {
  font-family: "Fira Code", Consolas, Menlo, Monaco, "Lucida Console", "Liberation Mono",
    "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Courier New", monospace, serif !important;
  /* border: 1px solid #eee; */
  height: 100%;
}

.CodeMirror-scroll {
  height: 100%;
  overflow-y: auto;
  overflow-x: auto;
}
</style>
