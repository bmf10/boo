/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import request from 'supertest'
import { app, server } from '../../../index'
import User from '../../../models/User'
import { hash } from '../../../utils/password'
import Profile from '../../../models/Profile'

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
      password: await hash('123456'),
    })
    await mockUser.save()

    const userLogin = await request(app).post('/user/login').send({
      email: 'user@example.com',
      password: '123456',
    })

    const token: string = userLogin.body.data.token

    const mockProfile = new Profile({
      name: 'Test Name',
      image: 'Test Image',
      enneagram: '2w3',
      mbti: 'INTJ',
      zodiac: 'Aries',
    })
    await mockProfile.save()

    const comment = {
      title: 'Test title',
      description: 'Test description',
      enneagram: '1w2',
      mbti: 'INTJ',
      zodiac: 'Aries',
      profileId: mockProfile.id,
    }

    const response = await request(app)
      .post('/comment/')
      .set('Authorization', `Bearer ${token}`)
      .send(comment)

    expect(response.status).toBe(200)
    expect(response.body.data.title).toBe(comment.title)
    expect(response.body.data.description).toBe(comment.description)
  }, 10000)

  it('should return 400 if profile not found', async () => {
    const mockUser = new User({
      email: 'user@example.com',
      name: 'Test User',
      image: 'https://example.com/image.jpg',
      password: await hash('123456'),
    })
    await mockUser.save()

    const userLogin = await request(app).post('/user/login').send({
      email: 'user@example.com',
      password: '123456',
    })

    const token: string = userLogin.body.data.token

    const comment = {
      title: 'Test title',
      description: 'Test description',
      enneagram: '1w2',
      mbti: 'INTJ',
      zodiac: 'Aries',
      //invalid random hex
      profileId: '65e422c97fc51deb6980c3c7',
    }

    const response = await request(app)
      .post('/comment/')
      .set('Authorization', `Bearer ${token}`)
      .send(comment)

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('Profile not found')
  }, 10000)
})
