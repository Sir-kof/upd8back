import { IAccountModel } from '../models/account'

export interface IGetAccountModel {
  id?: string
  cpf?: string
  name?: string
  address?: string
  birthday?: string
  gender?: string
  state?: string
  cidade?: string
}

export interface IGetAccounts {
  get: (account: IGetAccountModel) => Promise<IAccountModel>
}
