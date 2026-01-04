// 遙控器端：按下按鈕，送出 "start-counting" 事件

const socket = io();

window.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('start-btn');
    const resetBtn = document.getElementById('reset-btn');

    btn.addEventListener('click', () => {
        socket.emit('start-counting');
    });

    resetBtn.addEventListener('click', () => {
        socket.emit('reset-timer');
    });
});