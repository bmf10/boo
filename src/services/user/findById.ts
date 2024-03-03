import { RequestHandler, Router } from 'express'
import { Joi, schema, validate } from 'express-validation'
import User from '../../models/User'
import { successResponse } from '../../utils/general'

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
  const user = await User.findById(params.id)
  res.json(successResponse(user))
}

const router = Router()

router.get(
  '/:id',
  validate(validationSchema, { context: true }),
  requestHandler,
)

export default router
