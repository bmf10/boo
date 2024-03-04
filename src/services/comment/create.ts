import { RequestHandler, Router } from 'express'
import { Joi, schema, validate } from 'express-validation'
import { successResponse } from '../../utils/general'
import Comment, {
  IComment,
  enneagram,
  mbti,
  zodiac,
} from '../../models/Comment'
import { BadRequestError } from 'express-response-errors'
import Profile from '../../models/Profile'
import authMiddleware from '../../middlewares/auth'

type CreateCommentType = Omit<IComment, 'likeCount' | 'createdAt' | 'updateAt'>

const validationSchema: schema = {
  body: Joi.object<CreateCommentType>({
    title: Joi.string().required().trim(),
    description: Joi.string().required().trim(),
    enneagram: Joi.valid(...enneagram),
    mbti: Joi.valid(...mbti),
    zodiac: Joi.valid(...zodiac),
    profileId: Joi.string().hex().length(24).required(),
  }),
}

const requestHandler: RequestHandler = async (req, res, next) => {
  const userId = res.locals.user._id
  const body = req.body as CreateCommentType

  const profile = await Profile.findById(body.profileId)

  if (!profile) {
    return next(new BadRequestError('Profile not found'))
  }

  const comment = await Comment.create({ ...body, userId })

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
