import {Router} from 'express'
import * as ctx from './controller.js'
const router = new Router()


router.post('/create-room',ctx.createRoom)
router.get('/room',ctx.joinRoom)


export default router