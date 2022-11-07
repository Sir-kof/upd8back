import { IUserModel, IGetUserModel, IGetUserRepository } from './db-get-user-protocolls'
import { DbGetUser } from './db-get-user'

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

const makeFakeUserData = (): IGetUserModel => ({
  cpf: 'valid_cpf',
  name: 'valid_name',
  address: 'valid_address',
  birthday: '10/10/2022',
  gender: 'male',
  state: 'Rio de Janeiro',
  cidade: 'Duque de Caxias'
})

const makeGetUserRepository = (): IGetUserRepository => {
  class GetUserRepositoryStub implements IGetUserRepository {
    async get (User: IGetUserModel): Promise<IUserModel> {
      return await new Promise(resolve => resolve(makeFakeUser()))
    }
  }
  return new GetUserRepositoryStub()
}

interface SutTypes {
  sut: DbGetUser
  getUserRepositoryStub: IGetUserRepository
}

const makeSut = (): SutTypes => {
  const getUserRepositoryStub = makeGetUserRepository()
  const sut = new DbGetUser(getUserRepositoryStub)
  return {
    sut,
    getUserRepositoryStub
  }
}

describe('DbGetUser Usecase', () => {
  test('Should call GetUserRepository with correct values', async () => {
    const { sut } = makeSut()
    const promise = await sut.get(makeFakeUserData())
    expect(promise).toEqual({
      id: 'valid_id',
      cpf: 'valid_cpf',
      name: 'valid_name',
      address: 'valid_address',
      birthday: '10/10/2022',
      gender: 'male',
      state: 'Rio de Janeiro',
      cidade: 'Duque de Caxias'
    })
  })
})
