import mysql from 'mysql2'
import { IAddUserModel } from '../../../../domain/usecases/add-user'
import { IGetUserModel } from '../../../../domain/usecases/get-user'
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

  async getOne (userId: any): Promise<any> {
    const {
      id
    } = userId
    const user = await User.findOne({ where: { id } })
    return user
  },

  async update (idUser: any, newDataUser: any): Promise<void> {
    const { id } = idUser
    const {
      cpf,
      name,
      address,
      birthday,
      gender,
      state,
      city
    } = newDataUser

    await User.update({
      cpf, name, address, birthday, gender, state, city
    }, {
      where: {
        id
      }
    })
  },

  async delete (idUser: IRemoveUserModel): Promise<any> {
    const { id } = idUser
    const user = await User.destroy({ where: { id } })
    console.log(user)
    return user
  }
}
