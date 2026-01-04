// 簡單的 Node.js + Socket.IO 伺服器
const path = require('path');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// 靜態檔案 (html, js) 都從目前資料夾提供
app.use(express.static(__dirname));

io.on('connection', (socket) => {
    console.log('a user connected');

    // 接收遙控端送來的指令
    socket.on('start-counting', () => {
        console.log('start-counting command received');
        // 廣播給其他連線（例如 generator 頁面）
        socket.broadcast.emit('start-counting');
    });

    socket.on('reset-timer', () => {
        console.log('reset-timer command received');
        socket.broadcast.emit('reset-timer');
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
