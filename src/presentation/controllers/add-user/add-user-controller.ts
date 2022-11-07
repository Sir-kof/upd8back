import { HttpResponse, HttpRequest, Controller, IAddUser, Validation } from './add-user-controller-protocols'
import { badRequest, serverError, ok } from '../../helpers/http/http-helper'

export class AddUserController implements Controller {
  constructor (
    private readonly addUser: IAddUser,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    let response: HttpResponse

    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        response = badRequest(error)
        return response
      }
      const { cpf, name, address, birthday, gender, state, cidade } = httpRequest.body
      const user = await this.addUser.add({
        cpf,
        name,
        address,
        birthday,
        gender,
        state,
        cidade
      })

      response = ok(user)
      return response
    } catch (error) {
      response = serverError(error)
    }

    return response
  }
}
