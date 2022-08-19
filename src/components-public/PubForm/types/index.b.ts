type IFormType = 'input' | 'password' | 'select' | 'datepicker'

export interface IPubFormConfig {
  formItems: IFormItem[]
  labelWidth?: string
  itemStyle: any
  colLayout: any
}

export interface IFormItem {
  type: IFormType
  label: string
  rules?: any[]
  placeholder?: any
  options?: any[]
  otherOptions?: any,
  field: string
}
