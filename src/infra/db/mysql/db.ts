import env from '../../../main/config/env'
import { Sequelize } from 'sequelize'
export const database = new Sequelize(env.dbName, env.dbUser, env.dbPassword, {
  dialect: 'mysql'
})
