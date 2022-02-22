const express = require('express');
const app=express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + 'front/'));

app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/front/html/index.html");
});

io.on('connection',(socket)=>{
    console.log('user connected');
});

http.listen(4200,()=>{
    console.log('I think i managed to launch a server on 4200.')
})