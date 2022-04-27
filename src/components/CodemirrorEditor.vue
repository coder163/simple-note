<template>
  <textarea id="editor"></textarea>
</template>
<script lang="ts" setup>
import { onMounted, watch, ref } from "vue";
import { useStore } from "vuex";
import "codemirror/lib/codemirror.css";

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

// 折叠
require("codemirror/addon/fold/foldgutter.css");
require("codemirror/addon/fold/foldcode");
require("codemirror/addon/fold/foldgutter");
require("codemirror/addon/fold/brace-fold");
require("codemirror/addon/fold/comment-fold");
// 自动括号匹配功能
require("codemirror/addon/edit/matchbrackets");
require("codemirror/addon/scroll/annotatescrollbar.js");
require("codemirror/addon/search/matchesonscrollbar.js");
require("codemirror/addon/search/match-highlighter.js");
require("codemirror/addon/search/jump-to-line.js");
// 显示自动刷新
require("codemirror/addon/display/autorefresh");
//搜索功能
// require("codemirror/addon/dialog/dialog.js");
// require("codemirror/addon/dialog/dialog.css");
// require("codemirror/addon/search/searchcursor.js");
// require("codemirror/addon/search/search.js");
// //代码提示
// require("codemirror/addon/hint/show-hint");
// const CompleteEmoji = require("hypermd/goods/complete-emoji");
// require("codemirror/mode/haskell/haskell");



// 多语言支持？
// require("codemirror/addon/mode/overlay");
// require("codemirror/addon/mode/multiplex");

const { ipcRenderer } = window.require("electron");

let cm: any = null;
import "codemirror/theme/dracula.css";
const store = useStore();
let fileFullPath = ref<string>();
let option = {
  lineWrapping: true, //代码折叠
  foldGutter: true,
  gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"],
  viewportMargin: Infinity,
  lineNumbers: false,
  tabSize: 4,
  smartInden: true, //自动缩进是否开启
  autofocus: true, //自动获得焦点
  mode: "gfm",
  // theme: "dracula",
  matchBrackets: true, //括号匹配
  autoCloseBrackets: true, // 在键入时自动关闭括号和引号
  styleActiveLine: true, // 选中行高亮
  highlightFormatting: true, //md配置
  allowAtxHeaderWithoutSpace: true,
  //滚动条""
  scrollbarStyle: 'native'
};

ipcRenderer.on("read-file-reply", (event: any, path: string, data: any) => {
  cm.setValue(data);
  document.title = "简单笔记-" + path;
  fileFullPath.value = document.title;
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
  cm = CodeMirror.fromTextArea(document.getElementById("editor"), option);
  // cm.replaceRange("<div> </div>", { line: 0, ch: 0 }, { line: 2, ch: 10 });

  cm.on("change", function () { });
  /*
  cm.on("renderLine", (cm_: any, line: any, element: any) => {
    const result = line.text.match(/^!\[(.*)\]\((.*)\)/);
    const resultTag = line.text.match(/<img src="([^"]*?)"/);

    if (result || resultTag) {
      let para = document.createElement("div");
      para.setAttribute("style", "z-index:999; border-style:solid; border-color:black");
      // style="zoom:60%;"
      para.innerHTML = `<img  src='D:\\笔记整理\\Java研修录\\Linux基础\\${
        result ? result[2] : resultTag[1]
      }'   />`;
      element.appendChild(para);

    }
  });*/
  /*
  
  "mousedown", "dblclick", "touchstart", "contextmenu", "keydown", "keypress", "keyup", "cut", "copy", "paste", "dragstart", "dragenter", "dragover", "dragleave", "drop" 当CodeMirror处理此类DOM事件时触发。
   */
  cm.on("mousedown", (cm_: any, event: any) => {
    // 1 = 鼠标左键，2 = 鼠标右键，4 = 鼠标中键

    if (event.buttons === 2) {
      const client = {
        //@ts-ignore
        x: event.clientX,
        //@ts-ignore
        y: event.clientY,
      };
      ipcRenderer.send("menu", client);
    }
    // if (event.buttons === 1 || event.buttons === 4) {
    //   const element = event.target as Element
    //   if (element.classList.contains('cm-clickable-link')) {
    //     // 打开链接 ...
    //   }
    // }
    /*
        if (event.buttons === 1 && event.target.nodeName === "IMG") {
    
          let pos = cm.getCursor();
    
          let lineContent = cm.getLine(pos.line);
    
          if (lineContent && (lineContent.match(/<img src="([^"]*?)"/) === null)) {
            let img = `<img src='D:\\笔记整理\\Java研修录\\Linux基础\\'style="zoom:60%;"/>`
            cm_.replaceRange(img, { line: 5, ch: 0 })
            setTimeout(() => {
              cm_.focus();
              cm_.setCursor({
                line: 5,
                ch: 0,
              });
            }, 20);
          }
    
        }*/
  });
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
    "Ctrl-P": function () {
      // cm?.execCommand("find");
    },
    "Alt-/": function () {
      // cm?.execCommand("find");
    },
  });

  cm.on("inputRead", () => {
    // console.log("inputRead");
    // cm.showHint();
    document.title = fileFullPath.value + "*";
  });
  store.commit("updateEditor", cm);
});
</script>

<style lang="scss">
.CodeMirror {
  font-family:  "Fira Code",Consolas,  Menlo, Monaco, "Lucida Console",
    "Liberation Mono", "DejaVu Sans Mono", "Bitstream Vera Sans Mono",
    monospace, serif !important;
 
  height: 100% !important;
}


</style>
