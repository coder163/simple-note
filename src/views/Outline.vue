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
  //添加激活样式
  let items = document.querySelectorAll(".toc-item");

  items.forEach(item => {
    item?.addEventListener("click", (event) => {
      let itemActives = document.querySelectorAll(".item-active");

      itemActives.forEach(active => {
        active.classList.remove('item-active')
      })

      if (!item.classList.contains('item-active')) {

        item.classList.add('item-active')
      }

    })

  })
});
function update(cm: any) {
  var $toc = document.getElementById("outline") as HTMLElement;
  // console.log($toc, "update");
  if (!$toc) return;

  var lastTOC = "";

  var newTOC = "";

  cm.eachLine(function (line: any) {
    //let tmp = line.text.match(/(#+)[^\n]*?/);

    let tmp = line.text.match(/^(#+)\s+(.+)(?:\s+\1)?$/);
    if (!tmp) return;
    //提取行号
    let lineNo = line.lineNo();

    var level = tmp[1].length;
    //去除空格和#号
    let title = line.text.replace(/\s+/g, "").replace(/^#+/, "");

    newTOC +=
      '<div data-line="' +
      lineNo +
      '" class="toc-item "  style="padding-left:' +
      level +
      'em">' +
      title +
      "</div>";
  });
  if (newTOC == lastTOC) return;

  $toc.innerHTML = lastTOC = newTOC;
}

function selectItem(item: HTMLElement) {

  console.log(item)
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
