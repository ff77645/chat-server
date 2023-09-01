import { Router } from 'express'
import controller from '../../controller/auth.js'

const router = new Router()


router.post('/register',controller.register)
router.post('/reset-password',controller.resetPassword)
router.post('/send-verification-email',controller.sendVerificationEmail)
router.post('/logout',controller.logout)
router.post('/refresh-token',controller.refreshToken)



export default router