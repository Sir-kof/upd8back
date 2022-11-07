import { IUserModel, IUpdateUser, IUpdateUserRepository } from './db-update-user-protocolls'

export class DbUpdateUser implements IUpdateUser {
  constructor (
    private readonly addUserRepository: IUpdateUserRepository
  ) {}

  async update (id: string | number, newDataUser: string | object): Promise<IUserModel> {
    const user = await this.addUserRepository.update(id, Object.assign({}, newDataUser, { name: 'invalid_name' }))
    return user
  }
}
