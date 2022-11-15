import { serverError } from '../../helpers/http/http-helper'
import { MysqlHelper } from '../../../infra/db/mysql/helpers/mysql-helper'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const UpdateUserController = async (req, res) => {
  try {
    const resultUpdate = await MysqlHelper.update(req.params.cpf, req.body)
    return res.status(200).json(resultUpdate)
  } catch (e) {
    return serverError(e)
  }
}
