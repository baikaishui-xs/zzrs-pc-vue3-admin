<template>
  <component :is="isExpandIcon ? 'Expand' : 'Fold'" class="icon" @click="foldIcon" />
</template>
<script lang='ts'>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'Header',
  setup(props, { emit }) {
    let isExpandIcon = ref(false)

    const foldIcon = () => {
      isExpandIcon.value = !isExpandIcon.value
      emit('changeIsExpandIcon', isExpandIcon.value)
    }

    return {
      isExpandIcon,
      foldIcon
    }
  }
})
</script>
<style lang='scss' scoped>
.icon {
  width: 30px;
  height: 30px;
  margin-right: 6px;
  color: #fff;
}
</style>
