import redis from '../../redis/index.js'
import {v4 as uuid} from 'uuid'


export const createRoom = async (req,res)=>{
    /* 
        房间号
        房间名称
        房间id
    */
    const {roomName} = req.body
    const key = (await redis.hLen('rooms')) + 1
    const value = {
        roomNum:key,
        roomName,
        id:uuid()
    }
    redis.hSet('rooms',key,JSON.stringify(value))
    res.status(200).json({
        room:{
            roomNum:key,
            ...value,
        }
    })
}

export const joinRoom = async (req,res)=>{

    const {roomNum} = req.query
    const room = await redis.hGet('rooms',roomNum+'')
    res.status(200).json({
        room:JSON.parse(room)
    })
}



