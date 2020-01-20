const WebSocket = require('ws');
const fs = require('fs');

const ws = new WebSocket.Server({
    port: 4000,
    host: 'localhost'
});
ws.on('connection', (wss) => {
    let n = 0;
    setInterval(() => {
        ws.clients.forEach(client=>{
            if(client.readyState===WebSocket.OPEN)
            client.send(++n);
        })
    }, 15000);
    let k = 0;
    wss.on('pong', () => ++k)
    setInterval(() => {
        console.log(`active ${k}`);
        ws.clients.forEach(client=>{
            if(client.readyState===WebSocket.OPEN)
            {
                k=0;
                wss.ping('server:ping');
            }
        })
    }, 5000);
})