import {Router} from 'express'
import * as controller from '../../controller/room.js'

const router = new Router()


router.post('/create',controller.createRoom)
router.post('/join',controller.joinRoom)
// router.post('/leave-room',controller.leaveRoom)

export default router