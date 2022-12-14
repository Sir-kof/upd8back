import { serverError } from '../../helpers/http/http-helper'
import { MysqlHelper } from '../../../infra/db/mysql/helpers/mysql-helper'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const RemoveUserController = async (req, res) => {
  try {
    const user = await MysqlHelper.delete(req.params.cpf)
    return res.status(200).json(user)
  } catch (e) {
    return serverError(e)
  }
}
