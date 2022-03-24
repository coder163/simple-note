<template>
  <div id="icon-tool">
    <ul class="top">
      <li>
        <a :class="{ actvie: actvieLabel == 'book' }" @click="telescopic('book')">
          <font-awesome-icon icon="book" size="lg" />
        </a>
      </li>

      <li>
        <a
          to="/outline"
          :class="{ actvie: actvieLabel == 'bars' }"
          @click="telescopic('bars')"
        >
          <font-awesome-icon icon="bars" size="lg" />
        </a>
      </li>
      <!-- <li>
        <a href="#" :class="{ actvie: actvieLabel == 'rss' }" @click="telescopic('rss')">
          <font-awesome-icon icon="rss" @click="telescopic('rss')" size="lg" />
        </a>
      </li> -->
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
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

let iconTool: any = ref();
let actvieLabel = ref<string>("book");

//子组件向父组件事件传递
const emit = defineEmits(["actvie"]);
onMounted(() => {
  iconTool = ref(document.querySelector(".nav-tree"));
});

function telescopic(label: string = "book") {
  if (label == "book") {
    router.push({
      path: "/",
    });
  }
  if (label == "bars") {
    router.push({
      path: "/outline",
    });
  }
  emit("actvie", actvieLabel.value, label);
  actvieLabel.value = label;
}
</script>

<style lang="scss">
#icon-tool {
  background: #72787e;
  min-width: 40px;
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  .top {
    height: 50%;
    display: flex;
    flex-direction: column;
  }
  .bottom {
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin-bottom: 30px;
  }

  a {
    display: inline-block;
    width: 100%;
    line-height: 45px;
  }

  a:link,
  a:visited {
    color: #e5e5e5;
  }

  a:hover {
    color: #007acc;
    background-color: #d9d9d9;
    cursor: pointer;
  }
}

.actvie {
  background-color: #d9d9d9;
  color: #007acc !important;
}
</style>
