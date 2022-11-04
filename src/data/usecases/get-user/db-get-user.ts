import { IUserModel, IGetUser, IGetUserModel, IGetUserRepository } from './db-get-user-protocolls'

export class DbGetUser implements IGetUser {
  constructor (
    private readonly getUserRepository: IGetUserRepository
  ) {}

  async get (userData: IGetUserModel): Promise<IUserModel> {
    const user = await this.getUserRepository.get(userData)
    return user
  }
}
