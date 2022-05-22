<template>
  <div>
    <el-dropdown trigger="click" @command="handleSize">
      <div>
        <svg-icon class-name="size-icon" icon-class="size" />
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item 
            v-for="item in sizeOptions" 
            :key="item.value"
            :command="item.value"
            :disabled="item.value === size"
          >
            {{ item.label }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { ComponentInternalInstance, computed, defineComponent, getCurrentInstance, ref, ComponentPublicInstance, nextTick } from 'vue'
import { Size } from '@/plugins/element'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'
export default defineComponent({
  name: 'SizeSelect',
  setup () {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    const size = computed(() => store.getters.size)
    const sizeOptions = ref([
      { label: 'Default', value: 'default' },
      { label: 'Medium', value: 'medium' },
      { label: 'Small', value: 'small' },
      { label: 'Mini', value: 'mini' }
    ])

    // 刷新呢当前路由
    const refreshView = () => {
      // 需要清除路由缓存 否则size配置改变后组件size状态被缓存不更新
      store.dispatch('tagsView/delAllCachedViews')
      const { fullPath } = route
      nextTick(() => {
        router.replace({
          path: '/redirect' + fullPath
        })
      })
    }

    // command 获取点击按钮的command属性值 作为size值

    const handleSize = (command: Size) => {
      (proxy as ComponentPublicInstance).$ELEMENT.size = command

      store.dispatch('app/setSize', command)

      refreshView()
      proxy?.$message({
        type: 'success',
        message: 'Switch Size Success'
      })
    }

    return {
      sizeOptions,
      size,
      handleSize
    }
  }
})
</script>

<style lang="scss">
  .size-icon {
    font-size: 18px;
  }
</style>
