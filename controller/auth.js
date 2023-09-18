import catchAsync from '../utils/catchAsync.js'
import pool from '../mysql/index.js'
import dayjs from 'dayjs'
import {sign} from '../utils/jwt.js'
import {JWT_SECRET,TOKEN_EXPIRE} from '../config/index.js'


// 登录 注册
export const login = catchAsync(async (req,res)=>{
    const {email,password} = req.body
    let [[resp]] = await pool.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
    )
    if(!resp){
        const register_date = dayjs().format('YYYY-MM-DD HH:mm:ss')
        const register_ip = req.ip
        // TODO 生成随机用户名
        const username = ''
        // TODO 生成用户头像
        const avatar = ''
        await pool.query(
            'INSERT INTO users(username,email,password,avatar,register_date,register_ip,last_login_date,last_login_ip) VALUES (?,?,?,?,?,?,?,?)',
            [
                username,
                email,
                password,
                avatar,
                register_date,
                register_ip,
                register_date,
                register_ip
            ]
        )
        const [[user]] = await pool.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        )
        resp = user
    }else{
        if(resp.password !== password)  return res.status(403).json({msg:'密码错误'})
        const date = dayjs().format('YYYY-MM-DD HH:mm:ss')
        const ip = req.ip
        await pool.query(
            'UPDATE users SET last_login_date = ?,last_login_ip = ? WHERE id = ?',
            [date,ip,resp.id]
        )
    }
    const token = await sign({id:resp.id},JWT_SECRET,{
        expiresIn:TOKEN_EXPIRE
    })
    res.status(200).json({
        token,
        user:resp
    })
})


// 更新用户数据
export const updateUserData = catchAsync(async (req,res)=>{
    let {
        id
    } = req.body
    const [[user]] = await pool.query(
        'SELECT * FROM users WHERE id = ?',
        [id]
    )
    if(!user) return res.status(406).end() 
    let {
        username=user.username,
        nickname=user.nickname,
        gender=user.gender,
        mobile=user.mobile,
        mobile_confirmed=user.mobile_confirmed,
        avatar=user.avatar,
    } = req.body
    await pool.query(
        'UPDATE users SET username = ?,nickname = ?,gender = ?,mobile = ?,mobile_confirmed = ?,avatar = ? WHERE id = ?',
        [username,nickname,gender,mobile,mobile_confirmed,avatar,id]
    )
    res.status(200).json({msg:'修改成功'})
})


