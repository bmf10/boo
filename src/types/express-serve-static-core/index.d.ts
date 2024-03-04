import { AuthUser } from '../../types'

declare module 'express-serve-static-core' {
  interface Locals extends Locals {
    user: AuthUser
  }
}
