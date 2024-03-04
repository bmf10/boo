/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import request from 'supertest'
import { app, server } from '../../../index'

describe('POST /profile', () => {
  afterEach(() => {
    if (server && server.listening) {
      server.close()
    }
    jest.resetModules()
  }, 10000)

  it('should create a new profile and return 200 status', async () => {
    const newProfile = {
      name: 'Test Name',
      image: 'Test Image',
      enneagram: '2w3',
      mbti: 'INTJ',
      zodiac: 'Aries',
    }

    const res = await request(app).post('/profile').send(newProfile)

    expect(res.statusCode).toEqual(200)
    expect(res.body.data).toHaveProperty('name')
    expect(res.body.data).toHaveProperty('image')
    expect(res.body.data).toHaveProperty('enneagram')
    expect(res.body.data).toHaveProperty('mbti')
    expect(res.body.data).toHaveProperty('zodiac')
  })
})
