import { RequestHandler, Router } from 'express'
import { Joi, schema, validate } from 'express-validation'
import User, { IUser } from '../../models/User'
import { successResponse } from '../../utils/general'
import { BadRequestError } from 'express-response-errors'
import { hash } from '../../utils/password'
import { Document } from 'mongoose'

const validationSchema: schema = {
  body: Joi.object<IUser>({
    email: Joi.string().required().email().trim(),
    name: Joi.string().required().trim(),
    password: Joi.string().required(),
    image: Joi.string(),
  }),
}

const requestHandler: RequestHandler = async (req, res, next) => {
  const body = req.body as IUser

  const isEmailExist = await User.findOne({ email: body.email })

  if (isEmailExist) {
    return next(new BadRequestError('Email already exist'))
  }

  const user = (await User.create({
    ...body,
    password: await hash(body.password),
  })) as Document
  res.json(successResponse({ ...user.toJSON(), password: undefined }))
}

const router = Router()

router.post('/', validate(validationSchema, { context: true }), requestHandler)

export default router
