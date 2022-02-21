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
