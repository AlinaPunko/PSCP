const WebSocket = require('ws');
const fs = require('fs');

const ws = new WebSocket.Server({
    port: 4000,
    host: 'localhost'
});
ws.on('connection', (wss) => {
    let n=0;
    wss.on('message',(data)=>{
        console.log(data);
        ws.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                let result = JSON.parse(data);
                wss.send(JSON.stringify({server:++n, client:result.client, timestamp:new Date().toString()}))
            }
        }, 5000);
    })
   
})