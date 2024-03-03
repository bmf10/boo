import { Router } from 'express'
import create from './create'

const router = Router()

router.use(create)

export default router
