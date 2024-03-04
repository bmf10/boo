/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import request from 'supertest'
import User, { IUser } from '../../../models/User'
import { app, server } from '../../../index'
import { hash } from '../../../utils/password'

interface IUserResponse {
  data: IUser
  message?: string
}

describe('POST /user', () => {
  afterAll(() => {
    if (server && server.listening) {
      server.close()
    }
    jest.resetModules()
  }, 10000)

  it('should create a new user and return a success response', async () => {
    const mockUser = {
      email: 'test@example.com',
      name: 'Test User',
      image: 'https://example.com/image.jpg',
      password: '123456',
    }

    const res = await request(app).post('/user/').send(mockUser)

    const responseBody: IUserResponse = res.body

    expect(res.status).toBe(200)
    expect(responseBody.data).toHaveProperty('name')
    expect(responseBody.data).toHaveProperty('image')
    expect(responseBody.data).toHaveProperty('email')

    // Verify that the user was saved in the database
    const user: IUser | null = await User.findOne({ email: 'test@example.com' })
    expect(user).toBeDefined()
    expect(user?.name).toBe('Test User')
  }, 10000)

  it('should return 400 if email already exist', async () => {
    const userExist = new User({
      email: 'user@example.com',
      name: 'Test User',
      image: 'https://example.com/image.jpg',
      password: await hash('123456'),
    })
    await userExist.save()

    const mockUser = {
      email: 'user@example.com',
      name: 'Test User',
      image: 'https://example.com/image.jpg',
      password: '123456',
    }

    const res = await request(app).post('/user/').send(mockUser)

    const responseBody: IUserResponse = res.body

    expect(res.status).toBe(400)
    expect(responseBody.message).toBe('Email already exist')
  }, 10000)
})
