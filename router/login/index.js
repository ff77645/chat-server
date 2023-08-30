import {Router} from 'express'
import * as ctx from './controller.js'
const router = new Router()

router.post('/',ctx.login)
router.post('/register',ctx.register)
router.post('/change-psd',ctx.changePassword)
router.post('/retrieve-psd',ctx.retrievePassword)
router.post('/user/update',ctx.updateUserData)

export default router