import catchAsync from '../utils/catchAsync.js'


/**
 * 
 * @api {post} /v1/auth/register 注册
 * @apiName 注册
 * @apiGroup Auth
 * @apiVersion  0.2.0
 * 
 * 
 * @apiBody  {String} emai 邮箱地址
 * @apiBody  {String} password 用户密码
 * 
 * @apiSuccess (200) {type} name description
 * 
 * @apiSuccessExample {type} Success-Response:
 * {
 *     property : value
 * }
 * 
 * 
 */
export const register = catchAsync(async (req,res)=>{

})

/**
 * @api {post} /v1/auth/reset-password 密码重置
 * @apiGroup Auth
 * @apiVersion 0.1.0
 */
export const resetPassword = catchAsync(async (req,res)=>{

})

/**
 * @api {post} /v1/auth/send-verification-email 发送验证邮箱
 * @apiGroup Auth
 * @apiVersion 0.1.0
 */
export const sendVerificationEmail = catchAsync(async (res,res)=>{

})

/**
 * @api {post} /v1/auth/logout 退出登录
 * @apiGroup Auth
 * @apiVersion 0.1.0
 */
export const logout = catchAsync(async (res,res)=>{

})


/**
 * @api {post} /v1/auth/refresh-token 刷新token
 * @apiGroup Auth
 * @apiVersion 0.1.0
 */
export const refreshToken = catchAsync(async (req,res)=>{

})