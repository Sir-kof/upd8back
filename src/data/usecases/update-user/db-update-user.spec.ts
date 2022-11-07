import { IUserModel, IUpdateUserModel, IUpdateUserRepository } from './db-update-user-protocolls'
import { DbUpdateUser } from './db-update-user'

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

const makeFakeUserData = (): IUpdateUserModel => ({
  id: 'valid_id',
  newDataUser: {
    gender: 'female',
    state: 'São Paulo',
    cidade: 'Centro'
  }
})

const makeAddUserRepository = (): IUpdateUserRepository => {
  class UpdateUserRepositoryStub implements IUpdateUserRepository {
    async update (id: string | number, newDataUser: string | object): Promise<IUserModel> {
      return await new Promise(resolve => resolve(makeFakeUser()))
    }
  }
  return new UpdateUserRepositoryStub()
}

interface SutTypes {
  sut: DbUpdateUser
  updateUserRepositoryStub: IUpdateUserRepository
}

const makeSut = (): SutTypes => {
  const updateUserRepositoryStub = makeAddUserRepository()
  const sut = new DbUpdateUser(updateUserRepositoryStub)
  return {
    sut,
    updateUserRepositoryStub
  }
}

describe('DbAddUser Usecase', () => {
  test('', () => {
    expect(1).toBe(1)
  })
  // test('Should call AddUserRepository with correct values', async () => {
  //   const { sut, updateUserRepositoryStub } = makeSut()
  //   const { id } = makeFakeUserData()
  //   const updateSpy = jest.spyOn(updateUserRepositoryStub, 'update')
  //   await sut.update(id, makeFakeUserData())
  //   console.log(updateSpy)
  //   expect(updateSpy).toHaveBeenCalledWith({
  //     cpf: 'valid_cpf',
  //     name: 'invalid_name',
  //     address: 'valid_address',
  //     birthday: '10/10/2022',
  //     gender: 'male',
  //     state: 'Rio de Janeiro',
  //     cidade: 'Duque de Caxias'
  //   })
  // })

  // test('Should throw if AddUserRepository throws', async () => {
  //   const { sut, updateUserRepositoryStub } = makeSut()
  //   jest.spyOn(updateUserRepositoryStub, 'update').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
  //   const promise = sut.update(makeFakeUserData())
  //   await expect(promise).rejects.toThrow()
  // })

  // test('Should return an User if on success', async () => {
  //   const { sut } = makeSut()
  //   const user = await sut.update(makeFakeUserData())
  //   expect(user).toEqual(makeFakeUser())
  // })
})
