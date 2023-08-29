import {sign,decode,verify} from '../utils/jwt.js'
import {JWT_SECRET} from '../config/index.js'

export const loginCheck = async (req,res,next)=>{
    const token = req.headers['authorization']
    if(!token) return res.status(401).json({msg:'未登录'})
    try {
        const data = await verify(token,JWT_SECRET)
        req.user = {
            id:data.id
        }
        next()
    }catch(err){
        res.status(401).json({msg:'登录过期'})
    }
}