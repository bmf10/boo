/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import request from 'supertest'
import User, { IUser } from '../../../models/User'
import { app, server } from '../../../index'

describe('GET /user/:id', () => {
  afterAll(() => {
    if (server && server.listening) {
      server.close()
    }
    jest.resetModules()
  }, 10000)

  it('should fetch a user by id and return a success response', async () => {
    // Create a mock user
    const mockUser = new User({
      email: 'test@example.com',
      name: 'Test User',
      image: 'https://example.com/image.jpg',
    })
    await mockUser.save()

    const res = await request(app).get(`/user/${mockUser.id}`)

    expect(res.status).toBe(200)
    expect(res.body.data).toEqual(
      expect.objectContaining({
        email: mockUser.email,
        name: mockUser.name,
        image: mockUser.image,
      }),
    )

    // Verify that the user exists in the database
    const user: IUser | null = await User.findById(mockUser.id)
    expect(user).toBeDefined()
    expect(user?.name).toBe('Test User')
  }, 10000)
})
