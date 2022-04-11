<template><div id="editor"></div></template>

<script setup lang="ts">
import "@toast-ui/editor/dist/toastui-editor.css";
import Editor from "@toast-ui/editor";
//@ts-ignore
import CodeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";

// 工具栏显示中文
//@ts-ignore
import "@toast-ui/editor/dist/i18n/zh-cn.js";
import { onMounted } from "vue";

import Prism from "prismjs";
import "prismjs/themes/prism.min.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
onMounted(() => {
  window.addEventListener("DOMContentLoaded", (event) => {
    document.querySelectorAll("pre[class*=language-]").forEach(function (node) {
      node.classList.add("line-numbers");
    });
    Prism.highlightAll();
  });
  const editor = new Editor({
    el: document.querySelector("#editor") as HTMLElement,
    initialEditType: "markdown",
    previewStyle: "vertical",
    hideModeSwitch: true, // 不展示底部tab切换
    placeholder: "请输入正文...",
    height: "100%",
    plugins: [[CodeSyntaxHighlight, { highlighter: Prism }]],
    language: "zh-cn",
    events: {
      change: () => {
        //console.log(editor.getMarkdown());
      },
    },
    customHTMLRenderer: {
      heading(node, context) {
        console.log(node, context);
        return {
          type: context.entering ? "openTag" : "closeTag",
          tagName: "div",
          classNames: [`heading-${node.level}`],
        };
      },
      text(node, context) {
        const strongContent = node.parent.type === "strong";
        return {
          type: "text",
          content: strongContent ? node.literal.toUpperCase() : node.literal,
        };
      },
      linebreak(node, context) {
        return {
          type: "html",
          content: "\n<br />\n",
        };
      },
    },
  });
});
</script>

<style lang="scss" scoped></style>
