import mysql from 'mysql2'


const pool = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'123456',
    database:'test',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
})

const pollPromise = pool.promise()

export default pollPromise