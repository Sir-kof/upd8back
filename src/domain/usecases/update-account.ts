import { IAccountModel } from '../models/account'

export interface IUpdateAccountModel {
  id: string
  cpf?: string
  name?: string
  address?: string
  birthday?: string
  gender?: string
  state?: string
  cidade?: string
}

export interface IUpdateAccount {
  update: (account: IUpdateAccountModel) => Promise<IAccountModel>
}
