import mysql from 'mysql2'
import { IAddUserModel } from '../../../../domain/usecases/add-user'
import { IRemoveUserModel } from '../../../../domain/usecases/remove-user'
import env from '../../../../main/config/env'
import { User } from '../models'

export const MysqlHelper = {
  async connect (): Promise<any> {
    const client = mysql.createConnection({
      host: env.dbName,
      user: env.dbUser,
      password: env.dbPassword
    })
    return client
  },

  async create (user: IAddUserModel): Promise<any> {
    const {
      cpf,
      name,
      address,
      birthday,
      gender,
      state,
      city
    } = user
    const resultadoCreate = await User.create({
      cpf,
      name,
      address,
      birthday,
      gender,
      state,
      city
    })
    return resultadoCreate
  },

  async getOne (userCpf: any): Promise<any> {
    const {
      cpf
    } = userCpf
    const user = await User.findOne({ where: { cpf } })
    return user
  },

  async update (cpfUser: any, newDataUser: any): Promise<any> {
    const { cpf } = cpfUser
    const {
      name,
      address,
      birthday,
      state,
      city
    } = newDataUser

    const resultUpdate = await User.update({
      name, address, birthday, state, city
    }, {
      where: {
        cpf
      }
    })
    return resultUpdate
  },

  async delete (cpfUser: IRemoveUserModel): Promise<any> {
    const { cpf } = cpfUser
    const user = await User.destroy({ where: { cpf } })
    return user
  }
}
