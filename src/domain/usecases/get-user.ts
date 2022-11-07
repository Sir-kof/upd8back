import { IUserModel } from '../models/user'

export interface IGetUserModel {
  id: any
}

export interface IGetUser {
  get: (user: IGetUserModel) => Promise<IUserModel>
}
