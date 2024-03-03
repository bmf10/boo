/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import request from 'supertest'
import { app, server } from '../../../index'
import User from '../../../models/User'

describe('POST /comment', () => {
  afterEach(() => {
    if (server && server.listening) {
      server.close()
    }
    jest.resetModules()
  }, 10000)

  it('should create a comment', async () => {
    const mockUser = new User({
      email: 'user@example.com',
      name: 'Test User',
      image: 'https://example.com/image.jpg',
    })
    await mockUser.save()

    const mockProfile = new User({
      email: 'profile@example.com',
      name: 'Test User',
      image: 'https://example.com/image.jpg',
    })
    await mockProfile.save()

    const comment = {
      title: 'Test title',
      description: 'Test description',
      enneagram: '1w2',
      mbti: 'INTJ',
      zodiac: 'Aries',
      profileId: mockProfile.id,
      userId: mockUser.id,
    }

    const response = await request(app).post('/comment/').send(comment)

    expect(response.status).toBe(200)
    expect(response.body.data.title).toBe(comment.title)
    expect(response.body.data.description).toBe(comment.description)
  }, 10000)

  it('should return 400 if profile not found', async () => {
    const comment = {
      title: 'Test title',
      description: 'Test description',
      enneagram: '1w2',
      mbti: 'INTJ',
      zodiac: 'Aries',
      //invalid random hex
      profileId: '65e422c97fc51deb6980c3c7',
      //invalid random hex
      userId: '65e422c97fc51deb6980c3c1',
    }

    const response = await request(app).post('/comment/').send(comment)

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('Profile not found')
  }, 10000)
})
