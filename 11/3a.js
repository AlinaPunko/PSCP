const WebSocket = require('ws');
const fs = require('fs');

const ws = new WebSocket('ws://localhost:4000');
ws.on('open', () => {
    ws.on('message',(data)=>{console.log(data)});
    ws.on('ping',(data)=>{console.log('ping '+data)})
})