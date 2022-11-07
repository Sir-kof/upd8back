export interface IRemoveUserModel {
  id: any
}

export interface IRemoveUser {
  remove: (userId: any) => Promise<boolean>
}
