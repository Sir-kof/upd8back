import { IUserModel, IAddUserModel, IAddUserRepository } from './db-add-user-protocolls'
import { DbAddUser } from './db-add-user'

const makeFakeUser = (): IUserModel => ({
  id: 'valid_id',
  cpf: 'valid_cpf',
  name: 'valid_name',
  address: 'valid_address',
  birthday: '10/10/2022',
  gender: 'male',
  state: 'Rio de Janeiro',
  cidade: 'Duque de Caxias'
})

const makeFakeUserData = (): IAddUserModel => ({
  cpf: 'valid_cpf',
  name: 'valid_name',
  address: 'valid_address',
  birthday: '10/10/2022',
  gender: 'male',
  state: 'Rio de Janeiro',
  cidade: 'Duque de Caxias'
})

const makeAddUserRepository = (): IAddUserRepository => {
  class AddUserRepositoryStub implements IAddUserRepository {
    async add (User: IAddUserModel): Promise<IUserModel> {
      return await new Promise(resolve => resolve(makeFakeUser()))
    }
  }
  return new AddUserRepositoryStub()
}

interface SutTypes {
  sut: DbAddUser
  addUserRepositoryStub: IAddUserRepository
}

const makeSut = (): SutTypes => {
  const addUserRepositoryStub = makeAddUserRepository()
  const sut = new DbAddUser(addUserRepositoryStub)
  return {
    sut,
    addUserRepositoryStub
  }
}

describe('DbAddUser Usecase', () => {
  test('Should call AddUserRepository with correct values', async () => {
    const { sut, addUserRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addUserRepositoryStub, 'add')
    await sut.add(makeFakeUserData())
    expect(addSpy).toHaveBeenCalledWith({
      cpf: 'valid_cpf',
      name: 'valid_name',
      address: 'valid_address',
      birthday: '10/10/2022',
      gender: 'male',
      state: 'Rio de Janeiro',
      cidade: 'Duque de Caxias'
    })
  })

  test('Should throw if AddUserRepository throws', async () => {
    const { sut, addUserRepositoryStub } = makeSut()
    jest.spyOn(addUserRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.add(makeFakeUserData())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an User if on success', async () => {
    const { sut } = makeSut()
    const user = await sut.add(makeFakeUserData())
    expect(user).toEqual(makeFakeUser())
  })
})
