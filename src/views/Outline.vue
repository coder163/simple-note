<template>
  <div id="outline"></div>
</template>
<script lang="ts" setup>
import { onMounted } from "vue";
import { useStore } from "vuex";
const { ipcRenderer } = window.require("electron");
const store = useStore();

onMounted(() => {
  const codemirror = store.getters["getEditor"];

  // codemirror.on("changes", update);
  update(codemirror);
  let toc = document.getElementById("outline");
  //跳转到指定的行
  toc?.addEventListener("click", (event) => {
    let target = event.target as HTMLElement;

    if (!/toc-item/.test(target.className)) return;

    let lineNumber = target.getAttribute("data-line");

    // codemirror.setCursor(lineNumber, 0);
    ipcRenderer.send("set-cursor", lineNumber);
  });
});
function update(cm: any) {
  var $toc = document.getElementById("outline") as HTMLElement;
  var lastTOC = "";

  var newTOC = "";

  cm.eachLine(function (line: any) {
    // console.log(line);
    var tmp = /^(#+)\s+(.+)(?:\s+\1)?$/.exec(line.text);
    if (!tmp) return;
    var lineNo = line.lineNo();

    if (!cm.getStateAfter(lineNo).header) return; // double check but is not header
    var level = tmp[1].length;

    var title = tmp[2];

    title = title.replace(/([*_]{1,2}|~~|`+)(.+?)\1/g, "$2"); // em / bold / del / code
    title = title.replace(
      /\\(?=.)|\[\^.+?\]|\!\[((?:[^\\\]]+|\\.)+)\](\(.+?\)| ?\[.+?\])?/g,
      ""
    ); // images / escaping slashes / footref
    title = title.replace(/\[((?:[^\\\]]+|\\.)+)\](\(.+?\)| ?\[.+?\])/g, "$1"); // links
    title = title.replace(/&/g, "&amp;");
    title = title.replace(/</g, "&lt;");
    newTOC +=
      '<div data-line="' +
      lineNo +
      '" class="toc-item" style="padding-left:' +
      level +
      'em">' +
      title +
      "</div>";
  });
  if (newTOC == lastTOC) return;

  $toc.innerHTML = lastTOC = newTOC;
}
</script>
<style lang="scss">
#outline {
  width: 100%;
  overflow-y: scroll;
  .toc-item {
    line-height: 25px;
  }
  // background-color: aqua;
  .toc-item:hover {
    background-color: #e0e4e6;
    opacity: 0.8;
    cursor: pointer;
  }
}
</style>
