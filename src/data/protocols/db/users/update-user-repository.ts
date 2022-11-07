import { IUserModel } from '../../../../domain/models/user'

export interface IUpdateUserRepository {
  update: (id: string | number, newDataUser: string | object) => Promise<IUserModel>
}
