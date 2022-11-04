export interface IRemoveAccountModel {
  id: string
}

export interface IRemoveAccount {
  remove: (accountId: IRemoveAccountModel) => Promise<void>
}
