import { AddUserController } from './add-user-controller'
import { MissingParamError, ServerError } from '../../errors'
import { IUserModel, IAddUser, IAddUserModel, HttpRequest, Validation } from './add-user-controller-protocols'
import { ok, serverError, badRequest } from '../../helpers/http/http-helper'

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

const makeAddUser = (): IAddUser => {
  class AddUserStub implements IAddUser {
    async add (user: IAddUserModel): Promise<IUserModel> {
      return await new Promise(resolve => resolve(makeFakeUser()))
    }
  }
  return new AddUserStub()
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): any {
      return null
    }
  }
  return new ValidationStub()
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    cpf: 'valid_cpf',
    name: 'valid_name',
    address: 'valid_address',
    birthday: '10/10/2022',
    gender: 'male',
    state: 'Rio de Janeiro',
    cidade: 'Duque de Caxias'
  }
})

interface SutTypes {
  sut: AddUserController
  addUserStub: IAddUser
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const addUserStub = makeAddUser()
  const validationStub = makeValidation()
  const sut = new AddUserController(addUserStub, validationStub)
  return {
    sut,
    addUserStub,
    validationStub
  }
}

describe('Add User Controller', () => {
  test('Should call AddUser with correct values', async () => {
    const { sut, addUserStub } = makeSut()
    const addSpy = jest.spyOn(addUserStub, 'add')
    await sut.handle(makeFakeRequest())
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

  test('Should return 500 if AddUser throws', async () => {
    const { sut, addUserStub } = makeSut()
    jest.spyOn(addUserStub, 'add').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeUser()))
  })

  test('Should call Validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
