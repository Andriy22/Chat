const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const users = require('./users')();
// Функція для створення повідомлення
const newMsg = (name, text, id) => ({
    name,
    text,
    id,
})
// Socket IO
// Описанні всі функції для взяємодії з клієнтом

io.on('connection', sokcet => {
    console.log(users.add);
    console.log('User connected, socket id: ' + sokcet.id);

    sokcet.on('userJoin', (data, callback) => {
        if (!data.name || !data.room) {
            return callback("Invalid data!");
        }
        if(data.name === 'System') {
            return callback('System is system name');
        }
        // Connect user to room
        // Підключаємо користувача в комнату
        sokcet.join(data.room);
        users.remove(sokcet.id);
        users.add({
            id: sokcet.id,
            name: data.name,
            room: data.room,

        });

        callback({userId: sokcet.id})
        io.to(data.room).emit('updateUsers', users.getByRoom(data.room))
        sokcet.emit('newMessage', newMsg('System',`Hello ${data.name}! You are connected!`) )
        // sokcet.emit('newMessage', newMsg('Admin',`Hello`) )        
        sokcet.broadcast.to(data.room).emit('newMessage', newMsg('System', `User ${data.name} connected!`));
    });

    // Сервер створює повідомлення і відправляє на клієнт
    // Create message and callback to client!
    sokcet.on('createMessage', (data, callback) => {
      if (!data.text) {
        return callback('Text is required');
      } 
      const user = users.getById(data.id);
      if (user) {
        io.to(user.room).emit('newMessage', newMsg(user.name, data.text, data.id));
      }
      callback();
     
    });

    sokcet.on('userLeft', (id, callback) => {

        const user = users.remove(id);
        if (user) {
            io.to(user.room).emit('updateUsers', users.getByRoom(user.room))
            io.to(user.room).emit('newMessage', newMsg('System','User ' + user.name + ' disconnected'));
            return callback('done');
        }
        return callback('Not found');
    });

    sokcet.on('disconnect', () => {
        const user = users.remove(sokcet.id);
        if (user) {
            io.to(user.room).emit('updateUsers', users.getByRoom(user.room))
            io.to(user.room).emit('newMessage', newMsg('System','User' + user.name + ' disconnected'));
        }
    })
})

module.exports = {
    app,
    server,
}