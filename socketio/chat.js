import pool from '../mysql/index.js'

const SEND_TEXT = 'send_text'
const JOIN_ROOM = 'join_room'
const COMMON_ROOM = '000001'


export default io=>{
    const nsp = io.of('/chat')

    nsp.on('connection',async socket=>{
        // let {roomid,userid} = socket.handshake.query
        // roomid && socket.join(roomid)
        // if(userid && userid !== 'undefined'){
        //     const [[resp]] = await pool.query(
        //         'SELECT * FROM users WHERE id = ?',
        //         [userid]
        //     )
        //     socket.data.user = {
        //         id:resp.id,
        //         username:resp.username,
        //         nickname:resp.nickname,
        //         gender:resp.gender,
        //         avatar:resp.avatar,
        //     }
        // }
        socket.on('send-msg',data=>{
            socket.to(data.roomid).emit('send',data.value)
        })

        socket.on('join-room',id=>{
            socket.join(id)
            // roomid = id
            // const user = socket.data.user
            // socket.to(id).emit(SEND_TEXT,{
            //     sender:user.id,
            //     nickname:user.nickname,
            //     text:'我来啦',
            //     date:Date.now(),
            //     avatar:user.avatar,
            // })
        })

        socket.on('leave-room',roomid=>{
            socket.leave(roomid)
        })


        socket.join(COMMON_ROOM)
    })
}
// 创建房间


// 加入房间


// 离开房间


// 发送消息