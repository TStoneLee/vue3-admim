<template>
  <div>
    <h6 @click="isCollapse=!isCollapse" style="cursor: pointer;">侧边测试</h6>
    <el-menu
      class="sidebar-container-menu"
      mode="vertical"
      router
      :default-active="activeMenu"
      :background-color="scssVariables.menuBg"
      :text-color="scssVariables.menuText"
      :active-text-color="scssVariables.menuActiveText"
      :collapse="isCollapse"
      :collapse-transition="true"
    >
      <sidebar-item 
        v-for="route in menuRoutes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, ref } from 'vue'
  import { useRoute } from 'vue-router'
  // 导入scss变量在组件中使用 
  import variables from '@/styles/variables.scss'
  // el-menu-item封装  
  import SidebarItem from './SidebarItem.vue'
  import { routes } from '@/router'

  export default defineComponent({
    name: 'Siderbar',
    components: {
      SidebarItem
    },
    setup () {
      const route = useRoute()
      // 根据路由路径 对应 当前激活的菜单 页面刷新后 激活当前路由匹配的菜单
      const activeMenu = computed(() => {
        const { path } = route
        return path
      })    
      // scss变量
      const scssVariables = computed(() => variables)
      // 菜单展开收起状态 后面会放store里
      const isCollapse = ref(true)
      // 渲染路由
      const menuRoutes = computed(() => routes)

      return {
        // ...toRefs(variables), // 不有toRefs原因 缺点variables里面变量属性来源不明确
        scssVariables,
        isCollapse,
        activeMenu,
        menuRoutes
      }
    }
  })
</script>
<style>
</style>