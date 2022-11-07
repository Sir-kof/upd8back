import { RemoveUserController } from './remove-user-controller'
import { ServerError } from '../../errors'
import { IRemoveUser, HttpRequest, Validation } from './remove-user-controller-protocols'
import { serverError } from '../../helpers/http/http-helper'

const makeRemoveUser = (): IRemoveUser => {
  class RemoveUserStub implements IRemoveUser {
    async remove (id: string | number): Promise<boolean> {
      return await new Promise(resolve => resolve(false))
    }
  }
  return new RemoveUserStub()
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
    id: 'valid_id'
  }
})

interface SutTypes {
  sut: RemoveUserController
  removeUserStub: IRemoveUser
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const removeUserStub = makeRemoveUser()
  const validationStub = makeValidation()
  const sut = new RemoveUserController(removeUserStub, validationStub)
  return {
    sut,
    removeUserStub,
    validationStub
  }
}

describe('Remove User Controller', () => {
  test('Should call RemoveUser with correct values', async () => {
    const { sut } = makeSut()
    const promise = await sut.handle(makeFakeRequest())
    console.log(promise)
    expect(promise).toEqual({
      statusCode: 200,
      body: {
        id: 'valid_id'
      }
    })
  })

  test('Should return 500 if RemoveUser throws', async () => {
    const { sut, removeUserStub } = makeSut()
    jest.spyOn(removeUserStub, 'remove').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })
})
