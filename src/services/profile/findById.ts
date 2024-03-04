import { RequestHandler, Router } from 'express'
import { Joi, schema, validate } from 'express-validation'
import { successResponse } from '../../utils/general'
import Profile from '../../models/Profile'

interface Params {
  readonly id: string
}

const validationSchema: schema = {
  params: Joi.object<Params>({
    id: Joi.string().required(),
  }),
}

const requestHandler: RequestHandler = async (req, res) => {
  const params = req.params as unknown as Params
  const profile = await Profile.findById(params.id)
  res.json(successResponse(profile))
}

const router = Router()

router.get(
  '/:id',
  validate(validationSchema, { context: true }),
  requestHandler,
)

export default router
