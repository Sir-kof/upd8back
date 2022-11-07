import { IRemoveUserRepository } from './db-remove-user-protocolls'
import { DbRemoveUser } from './db-remove-user'

const makeRemoveUserRepository = (): IRemoveUserRepository => {
  class RemoveUserRepositoryStub implements IRemoveUserRepository {
    async remove (User: string): Promise<boolean> {
      return await new Promise(resolve => resolve(false))
    }
  }
  return new RemoveUserRepositoryStub()
}

interface SutTypes {
  sut: DbRemoveUser
  removeUserRepositoryStub: IRemoveUserRepository
}

const makeSut = (): SutTypes => {
  const removeUserRepositoryStub = makeRemoveUserRepository()
  const sut = new DbRemoveUser(removeUserRepositoryStub)
  return {
    sut,
    removeUserRepositoryStub
  }
}

describe('DbAddUser Usecase', () => {
  test('Should return an User if on success', async () => {
    const { sut } = makeSut()
    const User = await sut.remove('valid_id')
    expect(User).toBeTruthy()
  })
})
