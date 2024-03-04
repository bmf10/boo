import { RequestHandler, Router } from 'express'
import { Joi, schema, validate } from 'express-validation'
import User, { IUser } from '../../models/User'
import { successResponse } from '../../utils/general'
import { BadRequestError } from 'express-response-errors'
import { verify } from '../../utils/password'
import { Document } from 'mongoose'
import { sign } from '../../utils/jwt'

type LoginBodyType = Pick<IUser, 'email' | 'password'>

const validationSchema: schema = {
  body: Joi.object<LoginBodyType>({
    email: Joi.string().required().email().trim(),
    password: Joi.string().required(),
  }),
}

const requestHandler: RequestHandler = async (req, res, next) => {
  const body = req.body as LoginBodyType

  const user = (await User.findOne({ email: body.email })) as IUser & Document

  if (!user) {
    return next(new BadRequestError('Email or password is wrong'))
  }

  const isMatch = await verify(user.password, body.password)

  if (!isMatch) {
    return next(new BadRequestError('Email or password is wrong'))
  }

  const payload = {
    id: user.id,
  }

  const token = await sign(payload)

  res.json(successResponse({ token }))
}

const router = Router()

router.post(
  '/login',
  validate(validationSchema, { context: true }),
  requestHandler,
)

export default router
