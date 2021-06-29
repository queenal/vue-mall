<template>
  <div class="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "tabBar"
}
</script>

<style scoped lang="scss">
.tab-bar {
  display: flex;
  box-shadow: 0 -1px 1px rgba(0,0,0,.1);
  background-color: #f6f6f6;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
