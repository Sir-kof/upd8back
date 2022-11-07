import { IUserModel } from '../models/user'

export interface IAddUserModel {
  cpf: string
  name: string
  address: string
  birthday: string
  gender: string
  state: string
  city: string
}

export interface IAddUser {
  add: (user: IAddUserModel) => Promise<IUserModel>
}
