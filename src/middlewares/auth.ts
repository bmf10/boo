import type { RequestHandler } from 'express'
import { UnauthorizedError } from 'express-response-errors'

import { verify } from '../utils/jwt'
import User from '../models/User'

const authHeader = (auth?: string) => {
  if (auth && auth.startsWith('Bearer')) {
    return auth.substring(7)
  }
}

const authMiddleware: RequestHandler = async (req, res, next) => {
  const token = authHeader(req.get('Authorization'))

  if (!token) return next(new UnauthorizedError())
  try {
    const { payload } = await verify<{ readonly id: string }>(token)
    const user = await User.findById(payload.id)
    if (!user) {
      next(new UnauthorizedError())
    }

    res.locals.user = user
    next()
  } catch (error) {
    next(new UnauthorizedError())
  }
}

export default authMiddleware
