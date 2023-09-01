import dayjs from 'dayjs'
import pool from '../../mysql/index.js'
import {sendMail} from '../../utils/nodemailer.js'
import {sign} from '../../utils/jwt.js'
import {JWT_SECRET,TOKEN_EXPIRE} from '../../config/index.js'

// 登录
export const login = async (req,res)=>{
    const {email,password} = req.body
    const [[resp]] = await pool.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
    )
    if(!resp || resp.password !== password) {
        const msg = resp ? '密码错误' : '用户不存在'
        return res.status(403).json({msg})
    }
    const date = dayjs().format('YYYY-MM-DD HH:mm:ss')
    const ip = req.ip
    await pool.query(
        'UPDATE users SET last_login_date = ?,last_login_ip = ? WHERE id = ?',
        [date,ip,resp.id]
    )
    const token = await sign({id:resp.id},JWT_SECRET,{
        expiresIn:TOKEN_EXPIRE
    })
    res.status(200).json({
        token,
        user:resp
    })
}


// 修改用户信息
export const updateUserData = async (req,res)=>{
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
}


// 注册
export const register = async (req,res)=>{
    const {email,password} = req.body
    const [[resp]] = await pool.query(
        'SELECT * FROM users WHERE email = ? LIMIT 1',
        [email]
    )
    console.log({resp,email,password});
    if(resp) return res.status(403).json({msg:'账户已存在'})
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
        'SELECT * FROM users WHERE email = ? LIMIT 1',
        [email]
    )
    console.log({user});
    res.status(200).json({msg:'注册成功',user})
}

// 更换密码
export const changePassword = async (req,res)=>{
    const {email,password,newpassword} = req.body
    const [[resp]] = await pool.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
    )
    if(!resp || resp.password !== password) {
        const msg = resp ? '密码错误' : '用户不存在'
        res.status(403).json({msg})
    }
    const [user] = await pool.query(
        'UPDATE users SET password = ? WHERE email = ?',
        [newpassword,email]
    )
    res.status(200).json({
        msg:'修改成功'
    })
}

// 通过邮箱验证修改密码
export const changePasswordForEmail = async (req,res)=>{
    const {
        email,
        password,
        code
    } = req.body
    const action_type = 'RETRIEVE_PASSWORD'
    
    const [[user]] = await pool.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
    )

    if(!user) return res.status(400).json({msg:'邮箱未注册'})
    
    const [[resp]] = await pool.query(
        'SELECT * FROM verify_code WHERE receiver_email = ? AND action_type = ? ORDER BY send_date DESC LIMIT 1',
        [email,action_type]
    )

    if(!resp || resp.code !== code || +resp.send_date < Date.now() - 300000){
        const msg = !resp || resp.code !== code ? '验证码错误' : '验证码超时'
        return res.status(400).json({msg})
    }

    await pool.query(
        'UPDATE users SET password = ? WHERE id = ?',
        [password,user.id]
    )

    res.status(200).json({msg:'修改成功'})
}

// 找回密码
export const sendVerifyCodeForEmail = async (req,res)=>{
    let code = Math.floor(Math.random() * 900000) + 10000
    const email = req.body.email
    const sender_ip = req.ip
    const action_type = 'RETRIEVE_PASSWORD'
    let error = ''
    let isSended = false
    const [[user]] = await pool.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
    )
    if(!user) return res.status(400).json({msg:'邮箱未注册'})
        
    const [[resp]] = await pool.query(
        'SELECT * FROM verify_code WHERE receiver_email = ? AND action_type = ? ORDER BY send_date DESC LIMIT 1',
        [email,action_type]
    )

    if(resp && +resp.send_date >= Date.now() - 300000){
        code = resp.code
        isSended = true
    }

    await sendMail({
        from:'邮箱验证<ff77645@163.com>',
        subject:'找回密码',
        to:email,
        text:`验证码为:${code}`
    }).catch(err=>{
        error = err
    })
    if(error) return res.status(400).json(error)
    if(!isSended) {
        await pool.query(
            'INSERT INTO verify_code(receiver_email,code,send_date,sender_ip,action_type) VALUES (?,?,?,?,?)',
            [
                email,
                code,
                Date.now() + '',
                sender_ip,
                action_type
            ]
        )
    }
    res.status(200).json({
        msg:'发送成功',
    })
}

