<template>
  <div class="navbar">
    <hambuger @toggleClick="toggleClick" :is-active="sidebar && sidebar.opened"/>
    <breadcrumb />
    <div class="right-menu">
      <screen-full id="screenfull" class="right-menu-item hover-effect" />

      <el-tooltip content="Global Size" effect="dark" placement="bottom">
        <size-select class="right-menu-item hover-effect" />
      </el-tooltip>

      <avatar />
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { useStore } from '@/store/index'
  import Breadcrumb from '@/components/Breadcrumb/index.vue'
  import Hambuger from '@/components/Hambuger/index.vue'
  import ScreenFull from '@/components/Screenfull/index.vue'
  import SizeSelect from '@/components/SizeSelect/index.vue'
  import Avatar from './avatar/index.vue'
  export default defineComponent({
    name: 'Navbar',
    components: {
      Breadcrumb,
      Hambuger,
      ScreenFull,
      SizeSelect,
      Avatar
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

<style lang="scss">
  .navbar {
    display: flex;
    background: #fff;
    border-bottom: 1px solid rgba(0, 21, 41, .08);
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
    .right-menu {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 15px;
      &-item {
        padding: 0 8px;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;
        &.hover-effect {
          cursor: pointer;
          transition: background .3s;

          &:hover {
            background: rgba(0, 0, 0, .025);
          }
        }
      }
    }
  }
</style>
