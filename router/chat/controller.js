import redis from '../../redis/index.js'



export const createRoom = async (req,res)=>{

    const {roomNum} = req.body
    const id = 'id:' + redis.
    redis.hSet('rooms',)

}



