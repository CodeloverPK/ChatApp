// Node server which will handle socket io connections 


const io=require('socket.io')(8000,{
    cors:{
        origin:'*',
    }
});





const user={};

io.on('connection',socket=>{
    // if new user join , let other user connected to the server know .
    socket.on('new-user-joined',name=>{
        // console.log('New user', name); // ye to nodemon pr show krne ko 
        user[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });

    // If someone send message , broadcast to other people
    socket.on('send',message=>{
        socket.broadcast.emit('recieve',{message:message,name:user[socket.id]});
    });
    
    // if someone leaves the chat , let others know
    socket.on('disconnect',message=>{ 
        socket.broadcast.emit('left',user[socket.id]);
        delete user[socket.id];
    });
})