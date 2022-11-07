import env from '../../../../main/config/env'
import { MongoHelper as sut } from './mysql-helper'

globalThis.__MONGO_URL__ = env.mongoUrl

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(globalThis.__MONGO_URL__)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('Sould reconnect if mongo is down', async () => {
    let accountCollection = await sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
    await sut.disconnect()
    accountCollection = await sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
  })
})
