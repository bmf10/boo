/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import request from 'supertest'
import { app, server } from '../../../index'
import User from '../../../models/User'
import { hash } from '../../../utils/password'

describe('POST /user/login', () => {
  afterAll(() => {
    if (server && server.listening) {
      server.close()
    }
    jest.resetModules()
  }, 10000)

  it('should login a user', async () => {
    const user = new User({
      email: 'user@example.com',
      name: 'Test User',
      image: 'https://example.com/image.jpg',
      password: await hash('123456'),
    })
    await user.save()

    const res = await request(app).post('/user/login').send({
      email: 'user@example.com',
      password: '123456',
    })
    expect(res.statusCode).toEqual(200)
    expect(res.body.data).toHaveProperty('token')
  })

  it('should fail to login a user with wrong password', async () => {
    const res = await request(app).post('/user/login').send({
      email: 'test@example.com',
      password: 'wrongpassword',
    })
    expect(res.statusCode).toEqual(400)
    expect(res.body.message).toEqual('Email or password is wrong')
  })
})
