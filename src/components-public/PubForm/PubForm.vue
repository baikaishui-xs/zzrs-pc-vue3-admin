<template>
  <div class="form-container">
    <el-form :label-width="labelWidth">
      <el-row>
        <el-col v-for="item in formItems" :key="item.label" v-bind="colLayout">
          <el-form-item :label='item.label' :rules="item.rules" :style="itemStyle">
            <el-input v-if="item.type === 'input' || item.type === 'password'" v-bind="item.otherOptions" :placeholder="item.placeholder" :show-password="item.type === 'password'" v-model="userList[`${item.field}`]" />

            <el-select style="height: 40px;" v-if="item.type === 'select'" v-bind="item.otherOptions" :placeholder="item.placeholder">
              <el-option v-for='option in item.options' :key="option.value" :value="option.value">{{option.title}}</el-option>
            </el-select>

            <el-date-picker v-if="item.type === 'datepicker'" v-bind="item.otherOptions" v-model="userList[`${item.field}`]"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script lang='ts'>
import { defineComponent, PropType, ref } from 'vue'
import type { IFormItem } from './types'
import { watch } from 'vue'
import { Search } from '@element-plus/icons-vue'
export default defineComponent({
  name: 'PubForm',
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    itemStyle: {
      type: Object,
      default: () => ({ padding: '10px 40px' })
    },
    colLayout: {
      // 响应式属性
      type: Object,
      default: () => ({
        xl: 6,
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  },
  emits: ['update:modelValue', 'search'],
  setup(props, { emit }) {
    const userList = ref({ ...props.modelValue })

    watch(userList, (newValue) => emit('update:modelValue', newValue), {
      deep: true
    })

    return {
      userList,
      Search
    }
  }
})
</script>
<style lang='scss' scoped>
/deep/.el-form-item__label {
  line-height: 40px;
}
.el-input {
  height: 40px;
}
/deep/.el-input__wrapper {
  height: 40px;
}
.footer-box {
  text-align: right;
}
.btn {
  width: 80px;
  height: 40px;
}
</style>
