import { Router } from 'express'
import user from './user'
import comment from './comment'
import like from './like'
import profile from './profile'

const router = Router()

router.use('/user', user)
router.use('/comment', comment)
router.use('/like', like)
router.use('/profile', profile)

export default router
