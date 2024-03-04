import { Joi, schema, validate } from 'express-validation'
import Like, { ILike } from '../../models/Like'
import { RequestHandler, Router } from 'express'
import Comment, { IComment } from '../../models/Comment'
import { BadRequestError } from 'express-response-errors'
import { Document } from 'mongoose'
import { successResponse } from '../../utils/general'
import authMiddleware from '../../middlewares/auth'

type CreateLikeType = Omit<ILike, 'createdAt' | 'updateAt'>

const validationSchema: schema = {
  body: Joi.object<CreateLikeType>({
    commentId: Joi.string().hex().length(24).required(),
  }),
}

const requestHandler: RequestHandler = async (req, res, next) => {
  const userId = res.locals.user._id
  const body = req.body as CreateLikeType

  const comment = (await Comment.findById(
    body.commentId,
  )) as Mutable<IComment> & Document

  if (!comment) {
    return next(new BadRequestError('Comment not found'))
  }

  const like = await Like.findOne({
    userId,
    commentId: body.commentId,
  })

  if (!like) {
    comment.likeCount += 1
    await comment.save()
    await Like.create({ ...body, userId })
  } else {
    comment.likeCount -= 1
    await comment.save()
    await Like.deleteOne({ userId, commentId: body.commentId })
  }

  res.json(successResponse(comment))
}

const router = Router()

router.post(
  '/',
  authMiddleware,
  validate(validationSchema, { context: true }),
  requestHandler,
)

export default router
