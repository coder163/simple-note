<template>
  <div class="menu-bar">
    <div>
      <img class="logo" src="@/assets/logo.png" />
      <!-- 简单笔记 -->
    </div>
    <ol id="nav-list">
      <li>
        <font-awesome-icon icon="angle-down" />
      </li>
      <li>
        <font-awesome-icon :icon="['fas', 'minus']" />
      </li>
      <li>
        <!-- <font-awesome-icon :icon="['far', 'window-maximize']" /> -->
        <font-awesome-icon :icon="['far', 'window-restore']" />
      </li>
      <li>
        <font-awesome-icon icon="xmark" />
      </li>
    </ol>
  </div>
</template>
<style lang="css">
/*********************************顶部导航**********************************/

.menu-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f2f2f2;
  height: 35px;
  /* box-shadow: 12px 12px 15px #000; */
}

.logo {
  width: 20px;
  margin-left: 10px;
  height: auto;
}

#nav-list {
  display: flex;
  flex-wrap: nowrap;
  list-style-type: none;
  justify-content: space-around;
  /* width: 180px; */
  line-height: 35px;
  /* background: red; */
}

#nav-list li {
  /* outline: 1px solid #ccc; */
  /* background-color: #0f0; */
  width: 40px;
  text-align: center;
}

#nav-list li:hover {
  background-color: #dadada;
}
</style>
