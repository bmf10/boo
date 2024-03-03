import { Router } from 'express'
import create from './create'
import find from './find'

const router = Router()

router.use(create)
router.use(find)

export default router
