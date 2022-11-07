import { GetUserController } from './get-user-controller'
import { MissingParamError, ServerError } from '../../errors'
import { IUserModel, IGetUser, IGetUserModel, HttpRequest, Validation } from './get-user-controller-protocols'
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

const makeGetUser = (): IGetUser => {
  class GetUserStub implements IGetUser {
    async get (user: IGetUserModel): Promise<IUserModel> {
      return await new Promise(resolve => resolve(makeFakeUser()))
    }
  }
  return new GetUserStub()
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
  sut: GetUserController
  getUserStub: IGetUser
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const getUserStub = makeGetUser()
  const validationStub = makeValidation()
  const sut = new GetUserController(getUserStub, validationStub)
  return {
    sut,
    getUserStub,
    validationStub
  }
}

describe('Get User Controller', () => {
  test('Should call GetUser with correct values', async () => {
    const { sut } = makeSut()
    const promise = await sut.handle(makeFakeRequest())
    expect(promise).toEqual({
      statusCode: 200,
      body: {
        id: 'valid_id',
        cpf: 'valid_cpf',
        name: 'valid_name',
        address: 'valid_address',
        birthday: '10/10/2022',
        gender: 'male',
        state: 'Rio de Janeiro',
        cidade: 'Duque de Caxias'
      }
    })
  })

  test('Should return 500 if GetUser throws', async () => {
    const { sut, getUserStub } = makeSut()
    jest.spyOn(getUserStub, 'get').mockImplementationOnce(async () => {
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
