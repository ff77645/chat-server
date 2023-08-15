import {Router} from 'express'
import loginRouter from './login/index.js'
const router = new Router()

router.use('/login',loginRouter)

export default router