import { Router } from 'express'
import authRoute from './auth.js'
import roomRoute from './room.js'

const router = new Router()

router.use('/auth',authRoute)
router.use('/room',roomRoute)

export default router