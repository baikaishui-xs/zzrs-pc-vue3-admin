module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "prettier/prettier": 'off',
    '@typescript-eslint/no-var-requires': 'off', // 是否禁用 require
    '@typescript-eslint/no-explicit-any': 'off', // 是否禁用 any 类型
    '@typescript-eslint/explicit-module-boundary-types': 'off', // 是否 允许函数返回值自动推断
  }
}
