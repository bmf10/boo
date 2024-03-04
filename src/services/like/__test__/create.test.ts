/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import request from 'supertest'
import { app, server } from '../../../index' // import your express app
import mongoose from 'mongoose'
import User from '../../../models/User'
import Comment from '../../../models/Comment'
import Like from '../../../models/Like'
import { hash } from '../../../utils/password'

describe('POST /like', () => {
  let userId: string
  let commentId: string
  let token: string

  beforeEach(async () => {
    // Create a user and a comment in the database
    const user = new User({
      email: 'user@example.com',
      name: 'Test User',
      image: 'https://example.com/image.jpg',
      password: await hash('123456'),
    })
    await user.save()
    userId = user._id.toString()
    const userLogin = await request(app).post('/user/login').send({
      email: 'user@example.com',
      password: '123456',
    })
    token = userLogin.body.data.token

    const comment = new Comment({
      title: 'Test title',
      description: 'Test description',
      enneagram: '1w2',
      mbti: 'INTJ',
      zodiac: 'Aries',
      profileId: userId,
      userId: userId,
    })
    await comment.save()
    commentId = comment._id.toString()
  })

  afterEach(async () => {
    // Clean up the database
    await User.deleteMany({})
    await Comment.deleteMany({})
    await Like.deleteMany({})

    if (server && server.listening) {
      server.close()
    }
    jest.resetModules()
  })

  it('should create a like when there is no existing like from the user', async () => {
    const res = await request(app)
      .post('/like')
      .set('Authorization', `Bearer ${token}`)
      .send({ commentId })
      .expect(200)

    // Check the response
    expect(res.body.data.likeCount).toBe(1)

    // Check the database
    const like = await Like.findOne({ userId, commentId })
    expect(like).not.toBeNull()
  })

  it('should delete a like when there is an existing like from the user', async () => {
    // Create a like in the database
    const like = new Like({ userId, commentId })
    await like.save()
    await Comment.findByIdAndUpdate(commentId, { likeCount: 1 })

    const res = await request(app)
      .post('/like')
      .set('Authorization', `Bearer ${token}`)
      .send({ commentId })
      .expect(200)

    // Check the response
    expect(res.body.data.likeCount).toBe(0)

    // Check the database
    const likeInDb = await Like.findOne({ userId, commentId })
    expect(likeInDb).toBeNull()
  })

  it('should return 400 if the comment does not exist', async () => {
    const res = await request(app)
      .post('/like')
      .set('Authorization', `Bearer ${token}`)
      .send({ commentId: new mongoose.Types.ObjectId().toString() })
      .expect(400)

    // Check the response
    expect(res.body.message).toBe('Comment not found')
  })
})
