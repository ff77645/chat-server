import pool from '../mysql/index.js'

const SEND_TEXT = 'send_text'
const JOIN_ROOM = 'join_room'
const COMMON_ROOM = '000001'


export default io=>{
    const nsp = io.of('/chat')

    nsp.on('connection',async socket=>{
        console.log('connection chat',socket.id);
        socket.on('message',data=>{
            socket.to(data.roomid).emit('message',data.value)
        })

        socket.on('join-room',id=>{
            socket.join(id)
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