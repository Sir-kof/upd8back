import { serverError } from '../../helpers/http/http-helper'
import { MysqlHelper } from '../../../infra/db/mysql/helpers/mysql-helper'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const AddUserController = async (req, res) => {
  try {
    const films = await MysqlHelper.create(req.body)
    return res.status(200).json(films)
  } catch (e) {
    return serverError(e)
  }
}
