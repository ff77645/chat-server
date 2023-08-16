import {Server} from 'socket.io'


const io = new Server({
    cors:{
        origin:'*',
        credentials:true
    }
})

io.on('connection',socket =>{
    console.log('connection',socket.id);
    socket.on('disconnect',i=>{
        console.log('disconnect',i.id);
    })
})

export default httpServer =>{
    io.attach(httpServer)
}