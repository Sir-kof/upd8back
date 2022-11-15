import { serverError } from '../../helpers/http/http-helper'
import { MysqlHelper } from '../../../infra/db/mysql/helpers/mysql-helper'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const GetUserController = async (req, res) => {
  try {
    const cpf = req.params.cpf
    const user = await MysqlHelper.getOne(cpf)
    console.log('entrou no get')
    return res.status(200).json(user)
  } catch (e) {
    return serverError(e)
  }
}
