import express from 'express'
import morgan from 'morgan'
import Router from './router/index.js'

import './mysql/index.js'
const PORT = 3000

const app = express()

app.use(morgan('dev'))
app.set('trust proxy', true);
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/',(req,res)=>{
    res.send('Hello World!')
})
app.use(Router)


app.listen(PORT,()=>{
    console.log(`App listening port: ${PORT}`);
})