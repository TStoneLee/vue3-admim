<template>
  <el-breadcrumb class="app-breadcrumb breadcrumb-container" separator="/">
    <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
      <!-- 面包屑导航最后一个是不可点击的 因为最后一个正是当前所显示的路由 -->
      <span
          v-if="index == levelList.length - 1"
          class="no-redirect"
        >
          {{ item.meta.title }}
      </span>
      <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref, watch } from 'vue'
import { RouteLocationMatched, RouteLocationRaw, useRoute, useRouter } from 'vue-router'
import { compile } from 'path-to-regexp'

type PartialRouteLocationMatched = Partial<RouteLocationMatched>

export default defineComponent({
  name: 'Breadcrumb',
  setup () {
    const route = useRoute()
    const router = useRouter()
    const levelList = ref<Array<PartialRouteLocationMatched>>([]) // 导航列表 存放matched里筛选的路由记录
    const isDashboard = (route?: PartialRouteLocationMatched) => {
      const name = route && route.name
      if (!name) {
        return false
      }
      return (name as string).trim().toLocaleLowerCase() === 'dashboard'
    }

    const getBreadcrumb = () => {
      // 对匹配的路由进行过滤 过滤掉没有title属性的路由，没有title就无法作为面包屑导航
      let matched = route.matched.filter(item => item.meta && item.meta.title) as PartialRouteLocationMatched[]
      // 获取第一个匹配路由记录
      const first = matched[0]
      // 我们要把dashboard作为首页 始终固定在面包屑导航第一个 Dashboard/System/Menu Management
      // 如果第一个匹配到的路由记录不是dashboard 我们自己就把它放在记录数组的第一项
      if (!isDashboard(first)) {
        matched = ([{
          path: '/dashboard',
          meta: {
            title: 'Dashboard'
          }
        }] as PartialRouteLocationMatched[]).concat(matched)
      }

      levelList.value = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    }
    onBeforeMount(() => {
      getBreadcrumb()
    })

    watch(() => route.path, () => {
      getBreadcrumb()
    })
    // 主要是针对 动态路由 /user/:id 进行动态参数填充
    // path-to-regexp 文档说明 https://www.npmjs.com/package/path-to-regexp
    const pathCompile = (path: string) => {
      const toPath = compile(path)
      const params = route.params
      return toPath(params)
    }
    // 点击面包屑导航可跳转
    const handleLink = (route: RouteLocationMatched) => {
      const { path, redirect } = route
      if (redirect) {
        router.push(redirect as RouteLocationRaw)
        return
      }
      router.push(pathCompile(path))
    }

    return {
      levelList,
      handleLink
    }
  }
})
</script>

<style lang="scss">

.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all .5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-leave-active {
  position: absolute;
}

.breadcrumb-move {
  transition: all .5s;
}
</style>
