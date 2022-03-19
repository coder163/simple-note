<template>
  <textarea id="editor"></textarea>
</template>
<script lang="ts" setup>
import { onMounted, watch, ref } from "vue";
import { useStore } from "vuex";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/eclipse.css";
import "codemirror/theme/darcula.css";

//@ts-ignore
import CodeMirror from "codemirror";
import "codemirror/mode/gfm/gfm";
import "codemirror/mode/markdown/markdown";
import "codemirror/mode/clike/clike.js";
import "codemirror/addon/edit/continuelist.js";
import "codemirror/addon/selection/active-line.js";

require("codemirror/mode/clike/clike.js");
require("codemirror/mode/markdown/markdown.js");
require("codemirror/addon/edit/continuelist.js");
require("codemirror/addon/selection/active-line.js");
//滚动条
require("codemirror/addon/scroll/simplescrollbars.js");
require("codemirror/addon/scroll/simplescrollbars.css");

const CompleteEmoji = require("hypermd/goods/complete-emoji");
require("codemirror/mode/haskell/haskell");
const { ipcRenderer } = window.require("electron");
let HyperMD = require("hypermd");
let cm: any = null;

const store = useStore();

let option = {
  lineWrapping: true, //代码折叠
  viewportMargin: Infinity,
  lineNumbers: true,
  mode: "gfm",
  theme: "eclipse",
  matchBrackets: true, //括号匹配
  foldGutter: true,
  styleActiveLine: true, // 选中行高亮
  //md配置
  highlightFormatting: true,
  allowAtxHeaderWithoutSpace: true,
  hintOptions: {
    hint: CompleteEmoji.createHintFunc(),
  },
  extraKeys: {
    "Ctrl-p": "autocomplete", // Use Ctrl+Space to
  },
  hmdReadLink: {
    baseURI: "D:\\笔记整理\\Java研修录\\基础编程",
  },

  //滚动条""
  // scrollbarStyle:'native'
};

onMounted(() => {
  cm = CodeMirror.fromTextArea(document.getElementById("editor"), option);
  // cm = CodeMirror.fromTextArea(document.getElementById("editor"), option);

  cm.on("change", function () {
    // document.title = '我是标题:研修堂';
    // ipcRenderer.send("change-title", "/run/media/dancingcode/软件/创作笔记/研修堂/");
  });

  cm.on("inputRead", function (cm: any, change: any) {
    if (change.text.length === 1 && change.text[0] === ":") {
      cm.showHint();
    }
  });

  window.onload = function () {
    HyperMD.switchToHyperMD(cm, option);
  };
  store.commit("updateEditor", cm);
  // ipcRenderer.on("set-lineNumber", (event, lineNumber) => {
  //   setTimeout(() => {
  //     // codemirror.focus();
  //     cm.setCursor({
  //       line: lineNumber,
  //       ch: 0,
  //     });
  //   }, 20);
  // });
});
</script>

<style lang="scss">
.CodeMirror {
  font-family: "Fira Code", Consolas, Menlo, Monaco, "Lucida Console", "Liberation Mono",
    "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Courier New", monospace, serif !important;
  height: 100% !important;
}

.editor-tool {
  line-height: 30px;
  widows: 100%;
  background-color: #0f0;
}
</style>
