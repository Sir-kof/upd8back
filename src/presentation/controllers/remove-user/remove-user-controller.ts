import { HttpResponse, HttpRequest, Controller, IRemoveUser, Validation } from './remove-user-controller-protocols'
import { badRequest, serverError, ok } from '../../helpers/http/http-helper'

export class RemoveUserController implements Controller {
  constructor (
    private readonly getUser: IRemoveUser,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    let response: any

    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        response = badRequest(error)
        return response
      }
      const { id } = httpRequest.body
      await this.getUser.remove(id)

      response = ok({ id })
      return response
    } catch (error) {
      response = serverError(error)
    }

    return response
  }
}
