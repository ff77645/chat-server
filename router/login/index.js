import {Router} from 'express'
import * as ctx from './controller.js'
const router = new Router()

router.post('/',ctx.login)
router.post('/register',ctx.register)
router.post('/change-psd',ctx.changePassword)
router.post('/email/change-psd',ctx.changePasswordForEmail)
router.post('/email/verify-code',ctx.sendVerifyCodeForEmail)
router.post('/user/update',ctx.updateUserData)

export default router