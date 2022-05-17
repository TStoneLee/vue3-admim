<template>
  <component :is="type" v-bind="linkProps">
    <slot />
  </component>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from 'vue'
import { isExternal } from '@/utils/validate'
export default defineComponent({
  name: 'SidebarItemLink',
  props: {
    to: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const isExt = computed(() => isExternal(props.to))
    const type = computed(() => {
      if (isExt.value) {
        return 'a'
      }
      return 'router-link'
    })
    const linkProps = computed(() => {
      if (isExt.value) {
        return {
          href: props.to,
          target: '_blank',
          rel: 'noopener'
        }
      }
      return {
        to: props.to
      } 
    })

    return {
      type,
      linkProps
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