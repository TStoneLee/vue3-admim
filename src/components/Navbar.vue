<template>
  <div class="navbar">
    <hambuger @toggleClick="toggleClick" :is-active="sidebar && sidebar.opened"/>
    <breadcrumb />
  </div>
</template>
<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { useStore } from '@/store/index'
  import Breadcrumb from '@/components/Breadcrumb/index.vue'
  import Hambuger from '@/components/Hambuger/index.vue'
  export default defineComponent({
    name: 'Navbar',
    components: {
      Breadcrumb,
      Hambuger
    },
    setup () {
      const store = useStore()
      const toggleClick = () => {
        console.log('click')
        store.dispatch('app/toggleSidebar')
      }
      const sidebar = computed(() => {
        return store.getters.sidebar
      })
      return {
        toggleClick,
        sidebar
      }
    }
  })
</script>

<style lang="scss" scoped>
</style>
