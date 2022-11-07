import { IAddUserRepository } from '../../../../data/protocols/db/users/add-user-repository'
import { IGetUserRepository } from '../../../../data/protocols/db/users/get-user-repository'
import { IRemoveUserRepository } from '../../../../data/protocols/db/users/remove-user-repository'
import { IUpdateUserRepository } from '../../../../data/protocols/db/users/update-user-repository'
import { IUserModel } from '../../../../domain/models/user'
import { IAddUserModel } from '../../../../domain/usecases/add-user'
import { IGetUserModel } from '../../../../domain/usecases/get-user'
import { MongoHelper } from '../helpers/mysql-helper'

export class AccountMongoRepository implements IAddUserRepository, IGetUserRepository, IRemoveUserRepository, IUpdateUserRepository {
  async add (accountData: IAddUserModel): Promise<IUserModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    return MongoHelper.map(result.ops[0])
  }

  async get (email: IGetUserModel): Promise<IUserModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    return account && MongoHelper.map(account)
  }

  async remove (userId: string): Promise<boolean> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    return account && MongoHelper.map(account)
  }

  async update (id: string | number, newDataUser: string | object): Promise<IUserModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    return account && MongoHelper.map(account)
  }
}
