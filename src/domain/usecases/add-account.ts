import { IAccountModel } from '../models/account'

export interface IAddAccountModel {
  cpf: string
  name: string
  address: string
  birthday: string
  gender: string
  state: string
  cidade: string
}

export interface IAddAccount {
  add: (account: IAddAccountModel) => Promise<IAccountModel>
}
