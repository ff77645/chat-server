import {Router} from 'express'
import loginRouter from './login/index.js'
import chatRouter from './chat/index.js'

const router = new Router()

router.use('/login',loginRouter)
router.use('/chat',chatRouter)

export default router