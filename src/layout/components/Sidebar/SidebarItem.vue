<template>
  <div class="sidebar-item-container">
    <el-menu-item index="1">
      <svg-icon class="menu-icon" icon-class="lock"></svg-icon>
      <template #title>
        <span>Dashoard</span>
      </template>
    </el-menu-item>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs } from 'vue'
import { RouteRecordRaw } from 'vue-router'

export default defineComponent({
  name: 'SidebarItem',
  props: {
    item: {
      type: Object as PropType<RouteRecordRaw>,
      required: true
    },
    basePath: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const { item } = toRefs(props)
    console.log(item)
    return {

    }
  }
})
</script>

<style lang="scss">
.sidebar-item-container {
  .menu-icon {
    margin-right: 16px;
    margin-left: 5px;
    vertical-align: middle;
  }
}
</style>