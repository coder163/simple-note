<template>
  <div class="icon-tool">
    <ul class="top">
      <li>
        <a
          href="#"
          :class="{ actvie: actvieLabel == 'bars' }"
          @click="telescopic('bars')"
        >
          <font-awesome-icon icon="bars" size="lg" />
        </a>
      </li>

      <li>
        <a
          href="#"
          :class="{ actvie: actvieLabel == 'cloud-arrow-down' }"
          @click="telescopic('cloud-arrow-down')"
          ><font-awesome-icon icon="cloud-arrow-down" size="lg"
        /></a>
      </li>
      <li>
        <a href="#" :class="{ actvie: actvieLabel == 'rss' }" @click="telescopic('rss')">
          <font-awesome-icon icon="rss" @click="telescopic('rss')" size="lg"
        /></a>
      </li>
    </ul>
    <ul class="bottom">
      <li>
        <a href="#" :class="{ actvie: actvieLabel == 'cog' }" @click="telescopic('cog')">
          <font-awesome-icon icon="cog" size="lg" />
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "@vue/runtime-dom";

let iconTool: any = ref();
let actvieLabel = ref<string>("bars");
//子组件向父组件事件传递
const emit = defineEmits(["actvie"]);
onMounted(() => {
  iconTool = ref(document.querySelector(".nav-tree"));
  // iconTool.value.style.width = "300px";
});

function telescopic(label: string = "bars") {
  emit("actvie", actvieLabel.value, label);
  actvieLabel.value = label;

  // let width = iconTool.value.style.width;
  // if (width == "100%" || width == "") {
  //   iconTool.value.style.width = "0";
  // } else {
  //   iconTool.value.style.width = "100%";
  // }
}
</script>
<style lang="scss">
#layout-side-left-menu {
  background: #f0f;
  // width: 100%;
  height: 100%;
  display: flex;
}
#layout-side-left-menu .icon-tool {
  width: 40px;
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
}
#layout-side-left-menu .icon-tool .top {
  height: 50%;
  display: flex;
  flex-direction: column;
}
#layout-side-left-menu .icon-tool .bottom {
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-bottom: 30px;
}
#layout-side-left-menu .nav-tree {
  transition: width 500ms;
  background: #f00;
  width: 100%;
}

#layout-side-left-menu .icon-tool a {
  display: inline-block;
  width: 100%;
  line-height: 45px;
}
#layout-side-left-menu .icon-tool a:link,
#layout-side-left-menu .icon-tool a:visited {
  color: #e5e5e5;
}
#layout-side-left-menu .icon-tool a:hover {
  color: #007acc;
  background-color: #d9d9d9;
  cursor: pointer;
}

.actvie {
  background-color: #d9d9d9;
  color: #007acc !important;
}
</style>
