import { Router } from 'express'
import user from './user'
import comment from './comment'
import like from './like'

const router = Router()

router.use('/user', user)
router.use('/comment', comment)
router.use('/like', like)

export default router
