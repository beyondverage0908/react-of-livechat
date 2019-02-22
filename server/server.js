const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const model = require('./model')
const Chat = model.getModel('chat')

const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server, {origins: '*:*'})
io.on('connection', function(socket) {
    socket.on('sendmsg', function(data) {
        const chatid = [data.from, data.to].sort().join(',')
        const chat = new Chat({chatid: chatid, from: data.from, to: data.to, content: data.msg})
        chat.save(function(err, doc) {
            if (err) {
                console.log(`聊天信息持久化不成功-from:${data.from}-to:${data.to}-content:${data.msg}`)
            } else {
                console.log(`信息持久化成功`)
            }
            io.emit('recvmsg', doc)
        })
    })
})

const userRouter = require('./user');
app.use(cookieParser()); // 中间件 - 可以处理cookie信息
app.use(bodyParser.json()); // 中间件 - 使可以接受post请求

// 简单的日志系统，打印当前请求的方法类型和路径
// app.use(function(req, res, next) {
//     console.log('%s %s', req.method, req.url)
//     next()
// })

// 后端路由 => 表示服务启动后，会优先到/user路由查看关于user的信息
app.use('/user', userRouter);

server.listen(9093, function() {
    console.log('start port of 9093 success')
})
