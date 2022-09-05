export interface IGetUserList {
  name: string
  realname: string
  cellphone: string
  createAt: string
}

export interface IApiCreateUser {
  name: string
  realname: string
  password: string
  cellphone: string
  departmentId: string
  roleId: string
}

export interface IApiEditUser {
  cellphone: number
  departmentId: number
  name: string
  realname: string
  roleId: number
}
