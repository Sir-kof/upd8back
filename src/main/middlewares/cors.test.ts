import request from 'supertest'
import app from '../config/app'

describe('Cors Middleware', () => {
  test('Should enable CORS', async () => {
    app.get('/test_cors', (req, res) => {
      res.send()
    })
    await request(app)
      .get('/test_cors')
      .expect('access-control-alloww-origin', '*')
      .expect('access-control-alloww-methods', '*')
      .expect('access-control-alloww-headers', '*')
  })
})
