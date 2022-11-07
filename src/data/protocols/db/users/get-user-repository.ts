import { IGetUserModel } from '../../../../domain/usecases/get-user'
import { IUserModel } from '../../../usecases/add-user/db-add-user-protocolls'

export interface IGetUserRepository {
  get: (user: IGetUserModel) => Promise<IUserModel>
}
