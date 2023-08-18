import express from 'express'
import { createServer } from 'http'
import morgan from 'morgan'
import Router from './router/index.js'
import socket from './socketio/index.js'
import cors from 'cors'
import './mysql/index.js'
import './redis/index.js'
const PORT = 3000

const app = express()
const httpServer = createServer(app)
socket(httpServer)
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/',(req,res)=>{
    res.send('Hello World!')
})
app.use(Router)


httpServer.listen(PORT,()=>{
    console.log(`App listening port: ${PORT}`);
})