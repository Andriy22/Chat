const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);


io.on('connection', sokcet => {
    console.log('Connected');

    sokcet.on('createMessage', data => {
        sokcet.emit('newMessage', {
            text: data.text + ' CALLBACK BY SERVER',
        })
    })
    sokcet.emit('newMessage', {
        text: 'TEST',
    })
})

module.exports = {
    app,
    server,
}