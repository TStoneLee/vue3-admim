<template>
  <scroll-panle>
    <div class="tags-view-container">
      <div class="tags-view-wrapper">
        <router-link
          class="tags-view-item"
          :class="{
            active: isActive(tag)
          }"
          v-for="(tag, index) in visitedTags"
          :key="index"
          :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
          tag="span"
        >
          <el-dropdown
            trigger="contextmenu"
            @command="command => handleTagCommand(command, tag)">
            <span>
              {{ tag.meta.title }}
              <span
                v-if="!isAffix(tag)"
                class="el-icon-close"
                @click.prevent.stop="closeSelectedTag(tag)"
              ></span>
            </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="all">关闭所有</el-dropdown-item>
                  <el-dropdown-item command="other">关闭其他</el-dropdown-item>
                  <el-dropdown-item command="self">关闭</el-dropdown-item>
                </el-dropdown-menu>
              </template>
          </el-dropdown>
        </router-link>
      </div>
    </div>
  </scroll-panle>
</template>

<script lang="ts">
import { defineComponent, computed, watch, onMounted } from "vue"
import { RouteRecordRaw, useRoute, useRouter } from "vue-router"
import { useStore } from "@/store"
import { RouteLocationWithFullPath } from '@/store/modules/tagsView'
import { routes } from '@/router'
import path from 'path-browserify'
import ScrollPanle from "./ScrollPanle.vue"

enum TagCommandType {
  All  = 'all',
  Other = 'other',
  Self = 'self'
}
export default defineComponent({
  components: { ScrollPanle },
  name: 'TagsView',
  setup () {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    // 从store里获取 可显示的tags view
    const visitedTags = computed(() => store.state.tagsView.visitedViews)

    // 从路由表中过滤出要affixed tagviews
    const fillterAffixTags = (routes: Array<RouteLocationWithFullPath | RouteRecordRaw>, basePath = '/') => {
      let tags: RouteLocationWithFullPath[] = []
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          // 把路由路径解析成完整路径，路由可能是相对路径
          const tagPath = path.resolve(basePath, route.path)
          tags.push({
            name: route.name,
            path: tagPath,
            fullPath: tagPath,
            meta: { ...route.meta }
          } as RouteLocationWithFullPath)

          // 深度优先遍历 子路由（子路由路径可能相对于route.path父路由路径）
          if (route.children) {
            const childTags = fillterAffixTags(route.children, route.path)
            if (childTags.length) {
              tags = [...tags, ...childTags]
            }
          }
        }
      })
      return tags
    }

    // 初始添加affix的tag
    const initTags = () => {
      const affixTags = fillterAffixTags(routes)
      for (const tag of affixTags) {
        if (tag.name) {
          store.dispatch('tagsView/addVisitedView', tag)
        }
      }
    }

    const addTags = () => {
      const { name } = route
      if (name) {
        store.dispatch('tagsView/addView', route)
      }
    }
    watch(() => route.path, () => {
      addTags()
    })

    onMounted(() => {
      initTags()
      addTags()
    })

    const isActive = (tag: RouteRecordRaw) => {
      return tag.path === route.path
    }
    const toLastView = (visitedTags: RouteLocationWithFullPath[], view: RouteLocationWithFullPath) => {
      const lastView = visitedTags[visitedTags.length - 1]
      if (lastView) {
        router.replace({
          path: '/redirect' + lastView.fullPath as string
        })
      } else {
        // 如果刚刚删除的正是Dashboard 就重定向回Dashboard（首页）
        if (view.name === 'Dashboard') {
          router.replace({ path: '/redirect' + view.fullPath as string })
        } else {
          // tag都没有了 删除的也不是Dashboard 只能跳转首页
          router.push('/')
        }
      }
    }

    const closeSelectedTag = (view: RouteLocationWithFullPath) => {
      store.dispatch('tagsView/delView', view).then(() => {
        if (isActive(view)) {
          toLastView(visitedTags.value, view)
        }
      })
    }

    // 是否是始终固定在tagsview上的tag
    const isAffix = (tag: RouteLocationWithFullPath) => {
      return tag.meta && tag.meta.affix
    }

    const handleCloseAllTag = (view: RouteLocationWithFullPath) => {
      // 对于是affix的tag是不会被删除的
      store.dispatch('tagsView/delAllView').then(() => {
        // 关闭所有后 就让切换到剩下affix中最后一个tag
        toLastView(visitedTags.value, view)
      })
    }    
    // 删除其他tag 除了当前右键的tag
    const handleCloseOtherTag = (view: RouteLocationWithFullPath) => {
      store.dispatch('tagsView/delOthersViews', view).then(() => {
        if (!isActive(view)) { // 删除其他tag后 让该view路由激活
          router.push(view.path)
        }
      })
    }

    const handleTagCommand = (command: TagCommandType, view: RouteLocationWithFullPath) => {
      switch (command) {
        case TagCommandType.All:
          handleCloseAllTag(view)
          break
        case TagCommandType.Other: // 关闭其他tag 除了affix为true的和当前右键的tag
          handleCloseOtherTag(view)
          break
        case TagCommandType.Self: // 关闭当前右键的tag affix为true的tag下拉菜单中无此项
          closeSelectedTag(view)
      }
    }


    return {
      isActive,
      visitedTags,
      closeSelectedTag,
      isAffix,
      handleTagCommand
    }
  }

})
</script>
<style lang="scss" scoped>
.tags-view-container {
  // width: 100%;
  height: 34px;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  overflow: hidden;
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      background: #fff;
      color: #495060;
      padding: 0 8px;
      box-sizing: border-box;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          position: relative;
          display: inline-block;
          content: '';
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-right: 5px;
          background: #fff;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.tags-view-container {
  .el-icon-close {
    display: inline-block;
    width: 16px;
    height: 16px;
    position: relative;
    left: 2px;
    border-radius: 50%;
    text-align: center;
    transition: all .3s cubic-bezier(.645, .045, .355, 1);
    transform-origin: 100% 50%;
    &:before {
      transform: scale(.6);
      display: inline-block;
      vertical-align: -1px;
    }
    &:hover {
      background-color: #b4bccc;
      color: #fff;
    }
  }
}
</style>
