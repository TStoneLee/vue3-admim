<template>
  <div class="app-main">
{{cachedViews}}
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
          <component :is="Component" :key="key"></component>
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
export default defineComponent({
  name: 'AppMain',
  setup () {
    const route = useRoute()
    const store = useStore()
    const key = computed(() => route.path)
    // 缓存路由集合 暂时先是空数组
    const cachedViews = computed(() => store.state.tagsView.cachedViews)
    return {
      key,
      cachedViews
    }
  }
})
</script>

<style lang="scss" scoped>
  .app-main {
    min-height: calc(100vh - 50px);
  }
  .fade-transform-enter-active,
  .fade-transform-leave-active {
    transition: all .5s;
  }
  .fade-transform-enter-from {
    opacity: 0;
    transform: translateX(-30px);
  }

  .fade-transform-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
</style>
