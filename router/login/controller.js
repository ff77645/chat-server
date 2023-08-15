import pool from '../../mysql/index.js'

// 登录
export const login = async (req,res)=>{
    const {username,password} = req.body
    const [[resp]] = await pool.query(
        'SELECT * FROM users WHERE username = ? LIMIT 1',
        [username]
    )
    if(!resp || resp.password !== password) {
        const msg = resp ? '密码错误' : '用户不存在'
        return res.status(403).json({msg})
    }
    res.status(200).json(resp)
}

// 注册
export const register = async (req,res)=>{
    const {username,password} = req.body
    const [[resp]] = await pool.query(
        'SELECT * FROM users WHERE username = ? LIMIT 1',
        [username]
    )
    if(resp) return res.status(403).json({msg:'账户已存在'})
    const [user] = await pool.query(
        'INSERT INTO users(username,password) VALUES (?,?)',
        [username,password]
    )
    res.status(200).json(user)
}

// 更换密码
export const changePassword = async (req,res)=>{
    const {username,password,newpassword} = req.body
    const [[resp]] = await pool.query(
        'SELECT * FROM users WHERE username = ? LIMIT 1',
        [username]
    )
    if(!resp || resp.password !== password) {
        const msg = resp ? '密码错误' : '用户不存在'
        res.status(403).json({msg})
    }
    const [user] = await pool.query(
        'UPDATE users SET password = ? WHERE username = ?',
        [newpassword,username]
    )
    console.log({user});
    res.status(200).json({
        msg:'修改成功'
    })
}

// 找回密码
// todo 通过邮箱找回
export const retrievePassword = async (req,res)=>{
    res.send('Ok')
}

