<template>
  <div>
    <h1>Dashboard page</h1>
    <svg-icon icon-class="bug"></svg-icon>
    <svg-icon icon-class="404" class-name="custom-class" @click="sayHi"></svg-icon>
  </div>
</template>

<script setup lang="ts">
  const sayHi = () => {
    alert('hi svg')
  }
</script>

<style lang="scss">
  .custom-class { // 自定义样式404
    font-size: 200px;
    color: green;
  }
</style>
