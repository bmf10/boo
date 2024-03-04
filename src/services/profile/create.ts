import { RequestHandler, Router } from 'express'
import { Joi, schema, validate } from 'express-validation'
import { successResponse } from '../../utils/general'
import Profile, { IProfile } from '../../models/Profile'
import { enneagram, mbti, zodiac } from '../../models/Comment'

const validationSchema: schema = {
  body: Joi.object<IProfile>({
    name: Joi.string().required().trim(),
    image: Joi.string().required(),
    enneagram: Joi.valid(...enneagram).required(),
    mbti: Joi.valid(...mbti).required(),
    zodiac: Joi.valid(...zodiac).required(),
  }),
}

const requestHandler: RequestHandler = async (req, res) => {
  const body = req.body as IProfile

  const profile = await Profile.create(body)
  res.json(successResponse(profile))
}

const router = Router()

router.post('/', validate(validationSchema, { context: true }), requestHandler)

export default router
