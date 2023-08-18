

const SEND_TEXT = 'send_text'

export default io=>{
    const nsp = io.of('/chat')

    nsp.on('connection',socket=>{
        const roomnum = socket.handshake.query.roomnum
        roomnum && socket.join(roomnum)

        socket.on(SEND_TEXT,msg=>{
            socket.to(roomnum).emit(SEND_TEXT,msg)
        })
    })
}
// 创建房间


// 加入房间


// 离开房间


// 发送消息