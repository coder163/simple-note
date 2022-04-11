<template>
  <textarea id="editor"></textarea>
</template>
<script lang="ts" setup>
import { fstat } from "original-fs";
import { onMounted, watch, ref } from "vue";
import { useStore } from "vuex";

let HyperMD = require("hypermd");
// 如果需要为特殊元素添加语法高亮，请载入对应的模式
require("codemirror/mode/htmlmixed/htmlmixed"); // Markdown 内嵌HTML
require("codemirror/mode/stex/stex"); // TeX 数学公式
require("codemirror/mode/yaml/yaml"); // Front Matter

// 如果需要用第三方库增强 HyperMD 功能，请载入所需的 PowerPacks
require("hypermd/powerpack/fold-math-with-katex"); // 将会自动引入 "katex"
require("hypermd/powerpack/hover-with-marked"); // 将会自动引入 "marked"
// 你还可以再此添加其他 power packs...
// Power packs 需要第三方库，别忘记安装它们！
require("codemirror/theme/darcula.css");

require("codemirror/mode/clike/clike.js");
require("codemirror/mode/markdown/markdown.js");
require("codemirror/addon/edit/continuelist.js");
require("codemirror/addon/selection/active-line.js");
//滚动条
require("codemirror/addon/scroll/simplescrollbars.js");
require("codemirror/addon/scroll/simplescrollbars.css");
// 引入全局实例
//@ts-ignore
import CodeMirror from "codemirror";
const CompleteEmoji = require("hypermd/goods/complete-emoji");
require("codemirror/mode/haskell/haskell");
require("codemirror/theme/darcula.css");
const { ipcRenderer } = window.require("electron");
let cm: any = null;
let fileFullPath = ref<string>();

watch(fileFullPath, (newVal, oldVal) => {
  let path = newVal?.substring(0, newVal.lastIndexOf("\\"));
  console.log(path)
  cm.setOption("hmdReadLink", {
    baseURI: path,
  });
});

const store = useStore();

let option = {
  theme: "hypermd-light",
  // 高亮行功能
  styleActiveLine: true,
  hintOptions: {
    hint: CompleteEmoji.createHintFunc(),
  },
  hmdReadLink: {
    baseURI: "D:\\笔记整理\\Java研修录\\基础编程",
  },
  extraKeys: {
    //  配置按键
    Ctrl: "autocomplete", // 需要下面的synonyms配置
  },
  indentUnit: 4, // 缩进配置（默认为2）
  //滚动条""
  scrollbarStyle: "native",
};
ipcRenderer.on("read-file-reply", (event: any, path: string, data: any) => {
  cm.setValue(data);
  document.title = path;
  fileFullPath.value = path;
});

ipcRenderer.on("set-lineNumber", (event, lineNumber) => {
  setTimeout(() => {
    cm.focus();
    cm.setCursor({
      line: lineNumber,
      ch: 0,
    });
  }, 20);
});

onMounted(() => {
  cm = HyperMD.fromTextArea(document.getElementById("editor"), option);
  // 额外配置快捷键
  cm.addKeyMap({
    "Ctrl-S": function () {
      document.title = fileFullPath.value as string;
      let fs = window.require("fs");

      fs.writeFile(fileFullPath.value, cm.getValue(), (err: any) => {
        if (err) {
          console.log(err);
        }
      });
    },
    "Ctrl-F": function () {},
  });
  cm.on("change", function () {
    document.title = fileFullPath.value + "*";
  });

  cm.on("inputRead", function (cm: any, change: any) {
    if (change.text.length === 1 && change.text[0] === ":") {
      cm.showHint();
    }
  });

  store.commit("updateEditor", cm);
});
</script>

<style lang="scss">
.CodeMirror {
  font-family: "Fira Code", Consolas, Menlo, Monaco !important;
  height: 100% !important;
}

.editor-tool {
  line-height: 30px;
  widows: 100%;
  background-color: #0f0;
}
</style>
