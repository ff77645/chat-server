import { Router } from 'express'
import * as controller from '../../controller/auth.js'

const router = new Router()


// router.post('/register',controller.register)
// router.post('/reset-password',controller.resetPassword)
// router.post('/send-verification-email',controller.sendVerificationEmail)
// router.post('/logout',controller.logout)
// router.post('/refresh-token',controller.refreshToken)
router.post('/login',controller.login)
router.post('/update-user',controller.updateUserData)
router.get('/user-info',controller.getUserInfo)



export default router