import catchAsync from '../utils/catchAsync.js'
import redis from '../redis/index.js'
// import pool from '../mysql/index.js'

// 创建房间
export const createRoom = catchAsync(async (req,res)=>{
    const {
        roomName,
        roomId,
    } = req.body
    const roomNum = (await redis.hLen('rooms')) + 1
    const room = {
        roomName,
        roomId,
        roomNum,
    }

    redis.hSet('rooms',roomId,JSON.stringify(room))
    res.json({
        success:true,
        room
    })
})

// 加入房间
export const joinRoom = catchAsync(async (req,res)=>{
    const {
        roomNum,
    } = req.body
    const room = await redis.hGet('rooms',roomNum+'')
    res.json({
        success:true,
        room
    })
})

// 离开房间
export const leaveRoom = catchAsync(async (req,res)=>{
    
})