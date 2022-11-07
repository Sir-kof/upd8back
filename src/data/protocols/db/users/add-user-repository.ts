import { IAddUserModel } from '../../../../domain/usecases/add-user'
import { IUserModel } from '../../../../domain/models/user'

export interface IAddUserRepository {
  add: (userData: IAddUserModel) => Promise<IUserModel>
}
