import { IUserModel, IAddUser, IAddUserModel, IAddUserRepository } from './db-add-user-protocolls'

export class DbAddUser implements IAddUser {
  constructor (
    private readonly addUserRepository: IAddUserRepository
  ) {}

  async add (userData: IAddUserModel): Promise<IUserModel> {
    const User = await this.addUserRepository.add(Object.assign({}, userData))
    return User
  }
}
