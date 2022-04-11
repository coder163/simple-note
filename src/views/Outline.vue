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

  codemirror.on("changes", update);
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
  console.log($toc, "update");
  if (!$toc) return;

  var lastTOC = "";

  var newTOC = "";

  cm.eachLine(function (line: any) {
    let tmp = line.text.match(/(#+)[^\n]*?/);

    if (!tmp) return;
    //提取行号
    let lineNo = line.lineNo();

    var level = tmp[1].length;
    //去除空格和#号
    let title = line.text.replace(/\s+/g, "").replace(/^#+/, "");

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
