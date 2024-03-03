import { RequestHandler, Router } from 'express'
import { Joi, schema, validate } from 'express-validation'
import { successResponse } from '../../utils/general'
import Comment, {
  IComment,
  enneagram,
  mbti,
  zodiac,
} from '../../models/Comment'
import User from '../../models/User'
import { BadRequestError } from 'express-response-errors'

type CreateCommentType = Omit<IComment, 'likeCount' | 'createdAt' | 'updateAt'>

const validationSchema: schema = {
  body: Joi.object<CreateCommentType>({
    title: Joi.string().required().trim(),
    description: Joi.string().required().trim(),
    enneagram: Joi.valid(...enneagram),
    mbti: Joi.valid(...mbti),
    zodiac: Joi.valid(...zodiac),
    profileId: Joi.string().hex().length(24).required(),
    userId: Joi.string().hex().length(24).required(),
  }),
}

const requestHandler: RequestHandler = async (req, res, next) => {
  const body = req.body as CreateCommentType

  const profile = await User.findById(body.profileId)

  if (!profile) {
    return next(new BadRequestError('Profile not found'))
  }

  const user = await User.findById(body.userId)

  if (!user) {
    return next(new BadRequestError('User not found'))
  }

  const comment = await Comment.create(body)

  res.json(successResponse(comment))
}

const router = Router()

router.post('/', validate(validationSchema, { context: true }), requestHandler)

export default router
