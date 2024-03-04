/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import request from 'supertest'
import { app, server } from '../../../index'
import Profile, { IProfile } from '../../../models/Profile'

describe('GET /profile/:id', () => {
  afterAll(() => {
    if (server && server.listening) {
      server.close()
    }
    jest.resetModules()
  }, 10000)

  it('should fetch a user by id and return a success response', async () => {
    const rawData = {
      name: 'Test User',
      image: 'https://example.com/image.jpg',
      mbti: 'INTP',
      enneagram: '2w3',
      zodiac: 'Pisces',
    }

    // Create a mock user
    const mockProfile = new Profile(rawData)
    await mockProfile.save()

    const res = await request(app).get(`/profile/${mockProfile.id}`)

    expect(res.status).toBe(200)
    expect(res.body.data).toEqual(expect.objectContaining(rawData))

    // Verify that the user exists in the database
    const profile: IProfile | null = await Profile.findById(mockProfile.id)
    expect(profile).toBeDefined()
    expect(profile?.name).toBe('Test User')
  }, 10000)
})
