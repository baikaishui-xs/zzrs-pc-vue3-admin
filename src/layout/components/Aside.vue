<template>
  <div class="hd">
    <img class="img" src="@/assets/images/logo.png">
    <span class="text">电商后台管理系统</span>
  </div>
  <div class="bd">

  </div>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Aside'
})
</script>
<style lang='scss' scoped>
.hd {
  display: flex;
  justify-content: center;
  align-items: center;
  .img {
    width: 55px;
    margin-right: 3px;
  }
  .text {
    color: #fff;
  }
}
</style>
