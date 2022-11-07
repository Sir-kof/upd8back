import { IUserModel } from '../models/user'

export interface IUpdateUserModel {
  map: (arg0: (data: any) => any) => unknown
  id: string | number | object
  newDataUser: object
}

export interface IUpdateUser {
  update: (id: string | number | object, newDataUser: string | object) => Promise<IUserModel>
}
