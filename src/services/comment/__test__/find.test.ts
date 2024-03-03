/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import request from 'supertest'
import { app, server } from '../../../index'

describe('GET /comment', () => {
  afterEach(() => {
    if (server && server.listening) {
      server.close()
    }
    jest.resetModules()
  }, 10000)

  it('should return comments with default parameters', async () => {
    const res = await request(app).get('/comment')
    expect(res.statusCode).toEqual(200)
    expect(res.body.data).toHaveProperty('comments')
    expect(res.body.data).toHaveProperty('perPage')
    expect(res.body.data).toHaveProperty('page')
    expect(res.body.data).toHaveProperty('total')
  })

  it('should return comments with custom parameters', async () => {
    const res = await request(app).get(
      '/comment?sort=recent&enneagram=1w2&mbti=INTJ&zodiac=Aries&page=2&perPage=5',
    )
    expect(res.statusCode).toEqual(200)
    expect(res.body.data).toHaveProperty('comments')
    expect(res.body.data).toHaveProperty('perPage', 5)
    expect(res.body.data).toHaveProperty('page', 2)
  })
})
