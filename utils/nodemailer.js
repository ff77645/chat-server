import nodemailer from 'nodemailer'

export function sendMail(receiver){
    const transporter = nodemailer.createTransport({
        service:'163',
        auth:{
            user:'ff77645@163.com',
            pass:'WQPSLNNVDSIOZSBI'
        }
    })
    return new Promise((resolve,reject)=>{
        transporter.sendMail(receiver,(error,info)=>{
            if(error) return reject(error)
            resolve(info)
        })
    })
}