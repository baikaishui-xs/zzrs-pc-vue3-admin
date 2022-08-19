<template>
  <div class="form-container">
    <el-form :label-width="labelWidth">
      <el-row>
        <el-col :span="8" v-for="item in formItems" :key="item.label" v-bind="colLayout">
          <el-form-item :label='item.label' :rules="item.rules" :style="itemStyle">
            <el-input v-if="item.type === 'input' || item.type === 'password'" v-bind="item.otherOptions" :placeholder="item.placeholder" :show-password="item.type === 'password'" v-model="formData[`${item.field}`]" />

            <el-select style="height: 40px;" v-if="item.type === 'select'" v-bind="item.otherOptions" :placeholder="item.placeholder">
              <el-option v-for='option in item.options' :key="option.value" :value="option.value">{{option.title}}</el-option>
            </el-select>

            <el-date-picker v-if="item.type === 'datepicker'" v-bind="item.otherOptions"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="footer-box">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script lang='ts'>
import { defineComponent, PropType, ref } from 'vue'
import type { IFormItem } from './types/index.b'
import { watch } from 'vue'
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
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const formData = ref({ ...props.modelValue })

    watch(formData, (newValue) => emit('update:modelValue', newValue), {
      deep: true
    })

    return {
      formData
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
</style>
