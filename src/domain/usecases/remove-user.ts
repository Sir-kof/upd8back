export interface IRemoveUserModel {
  cpf: any
}

export interface IRemoveUser {
  remove: (userCpf: any) => Promise<boolean>
}
