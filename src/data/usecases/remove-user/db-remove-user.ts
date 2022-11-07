import { IRemoveUser, IRemoveUserRepository } from './db-remove-user-protocolls'

export class DbRemoveUser implements IRemoveUser {
  constructor (
    private readonly removeUserRepository: IRemoveUserRepository
  ) {}

  async remove (userId: string): Promise<boolean> {
    await this.removeUserRepository.remove(userId)
    return true
  }
}
