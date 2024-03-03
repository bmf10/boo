import { RequestHandler, Router } from 'express'
import { Joi, schema, validate } from 'express-validation'
import { successResponse } from '../../utils/general'
import Comment, {
  EnneagramType,
  MbtiType,
  ZodiacType,
  enneagram,
  mbti,
  zodiac,
} from '../../models/Comment'

interface Query {
  readonly sort: 'best' | 'recent'
  readonly enneagram?: EnneagramType
  readonly mbti?: MbtiType
  readonly zodiac?: ZodiacType
  readonly perPage: number
  readonly page: number
}

const validationSchema: schema = {
  query: Joi.object<Query>({
    sort: Joi.valid('best', 'recent').default('best'),
    enneagram: Joi.valid(...enneagram),
    mbti: Joi.valid(...mbti),
    zodiac: Joi.valid(...zodiac),
    page: Joi.number().default(1).min(1),
    perPage: Joi.number().default(10).min(1).max(100),
  }),
}

const requestHandler: RequestHandler = async (req, res) => {
  const query = req.query as unknown as Query
  const conditions: { [key: string]: unknown } = {}

  if (query.enneagram) {
    conditions['enneagram'] = query.enneagram
  }

  if (query.mbti) {
    conditions['mbti'] = query.mbti
  }

  if (query.zodiac) {
    conditions['zodiac'] = query.zodiac
  }

  let sortCondition = {}
  if (query.sort === 'best') {
    sortCondition = { likeCount: -1 }
  } else {
    sortCondition = { createdAt: -1 }
  }

  const skip = (query.page - 1) * query.perPage
  const comments = await Comment.find(conditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(query.perPage)
  const total = await Comment.countDocuments(conditions)
  res.json(
    successResponse({
      comments,
      perPage: query.perPage,
      page: query.page,
      total,
    }),
  )
}

const router = Router()

router.get('/', validate(validationSchema, { context: true }), requestHandler)

export default router
