<template>
  <div class='panel-container'>
    <el-tabs type="border-card" stretch style="width: 300px">

      <!-- 账号登录 tabs -->
      <el-tab-pane>
        <template #label>
          <span class="custom-tabs-label">
            <el-icon :size="20">
              <Avatar />
            </el-icon>
            <span class="text">账号登录</span>
          </span>
        </template>
        <AccountTab ref="accountTabRef"></AccountTab>
      </el-tab-pane>

      <!-- 手机登录 tabs -->
      <el-tab-pane>
        <template #label>
          <span class="custom-tabs-label">
            <el-icon :size="20">
              <Iphone />
            </el-icon>
            <span class="text">手机登录</span>
          </span>
        </template>
        <PhoneTab></PhoneTab>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AccountTab from './AccountTab.vue'
import PhoneTab from './PhoneTab.vue'
export default defineComponent({
  name: 'Panel',
  components: {
    AccountTab,
    PhoneTab
  }
})
</script>

<style lang='scss' scoped>
.custom-tabs-label {
  display: flex;
  justify-content: center;
  align-items: center;
  .text {
    margin-left: 3px;
  }
}
</style>
