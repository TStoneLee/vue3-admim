<template>
  <div v-if="!item.meta || !item.meta.hidden" class="sidebar-item-container">
    <!-- 一个路由下只有一个子路由的时候 只渲染这个子路由 -->
    <template v-if="theOnlyOneChildRoute && (!theOnlyOneChildRoute.children || theOnlyOneChildRoute.noShowingChildren)">
      <sidebar-item-link
        v-if="theOnlyOneChildRoute.meta "
        :to="resolvePath(theOnlyOneChildRoute.path)"
      >
        <el-menu-item :index="resolvePath(theOnlyOneChildRoute.path)">
          <svg-icon
            v-if="icon"
            class="menu-icon"
            :icon-class="icon"
          ></svg-icon>
          <template #title>
            <span>{{ theOnlyOneChildRoute.meta.title }}</span>
          </template>
        </el-menu-item>
      </sidebar-item-link>
    </template>
    <el-sub-menu 
      v-else
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <template #title>
        <svg-icon
          v-if="item.meta.icon"
          class="menu-icon"
          :icon-class="item.meta.icon"
        ></svg-icon>
        <span class="submenu-title">{{ item.meta.title }}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
      >
      </sidebar-item>
    </el-sub-menu>
    <!-- <el-menu-item index="1">
      <svg-icon class="menu-icon" icon-class="lock"></svg-icon>
      <template #title>
        <span>Dashoard</span>
      </template>
    </el-menu-item> -->
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import path from 'path-browserify'
import SidebarItemLink from './SidebarItemLink.vue'
import { isExternal } from '@/utils/validate'
export default defineComponent({
  name: 'SidebarItem',
  components: {
    SidebarItemLink
  },
  props: {
    item: { // 当前路由（此时的父路由）
      type: Object as PropType<RouteRecordRaw>,
      required: true
    },
    basePath: { // 父路由路径（子路由路径如果是相对的 要基于父路径）
      type: String,
      required: true
    }
  },
  setup (props) {
    const { item } = toRefs(props)
    console.log(item)
    // 渲染菜单主要先看子路由
    // 比如我们的路由 一级路由一般都是layout组件 二级路由才是我们考虑要渲染成菜单的

    // 子路由数量
    const showingChildNumber = computed(() => {
      const children = (props.item.children || []).filter(child => {
        if (child.meta && child.meta.hidden)  return false
        return true
      })
      return children.length
    })
    // 要渲染的单个路由 如果该路由只有一个子路由 默认直接渲染这个子路由 
    // theOnlyOneChildRoute直接通过el-menu-item组件来渲染
    const theOnlyOneChildRoute = computed(() => {
      if (showingChildNumber.value > 1) {
        return null
      }
      // 只有一个子路由 还要筛选路由meta里有无hidden属性 hidden：true则过滤出去 不用管
      // 路由meta里我们会配置hidden属性表示不渲染成菜单，比如login 401 404页面是不渲染成菜单的
      if (item.value.children) {
        for (const child of item.value.children) {
          if (!child.meta || !child.meta.hidden) {
            return child
          }
        }
      }
      // showingChildNumber === 0 无可渲染的子路由 （可能有子路由 hidden属性为true）
      // 无可渲染chiildren时 把当前路由item作为仅有的子路由渲染
      return {
        ...props.item,
        path: '',
        noShowingChildren: true // 无可渲染chiildren
      }
    })
    const icon = computed(() => {
      return theOnlyOneChildRoute.value?.meta?.icon || props?.item?.meta?.icon
    })

    const resolvePath = (childPath: string) => {
      if (isExternal(childPath)) {
        return childPath
      }
      return path.resolve(props.basePath, childPath)
    }
    return {      
      theOnlyOneChildRoute,
      icon,
      resolvePath
    }
  }
})
</script>

<style lang="scss">
.sidebar-item-container {
  .menu-icon {
    flex-shrink: 0;
    // margin-right: 16px;
    margin-left: 5px;
    vertical-align: middle;
  }
}
</style>