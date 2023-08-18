import {Router} from 'express'
import * as ctx from './controller.js'
const router = new Router()


router.post('/create-room',ctx.createRoom)
router.post('/join-room',ctx.joinRoom)


export default router