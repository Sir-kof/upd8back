import { HttpResponse, HttpRequest, Controller, IGetUser, Validation } from './get-user-controller-protocols'
import { badRequest, serverError, ok } from '../../helpers/http/http-helper'

export class GetUserController implements Controller {
  constructor (
    private readonly getUser: IGetUser,
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
      const user = await this.getUser.get({
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
