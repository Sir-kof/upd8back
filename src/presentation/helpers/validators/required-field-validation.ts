import { Validation } from '../../protocols/validation'
import { MissingParamError } from '../../errors'

export class RequiredFieldValidation implements Validation {
  private readonly fieldName: string

  constructor (fieldName: string) {
    this.fieldName = fieldName
  }

  validate (input: any): any {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName)
    }
  }
}
