const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer,{
    cors: {
        origin:"*",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
      }
})
 
io.on('connection', socket => {
    const id = socket.handshake.query.id
    socket.join(id)

    socket.on('send-message', ({recipients, text, d}) => {
        recipients.forEach(recipient => {
            const newRecipients = recipients.filter(r => r !== recipient)
            newRecipients.push(id)
            socket.broadcast.to(recipient).emit('receive-message',{
                recipients : newRecipients,sender: id,text,date:d
            })
        })
    })
})
httpServer.listen(5000);