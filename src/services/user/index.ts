import { Router } from 'express'
import create from './create'
import findById from './findById'

const router = Router()

router.use(create)
router.use(findById)

export default router
