const WebSocket = require('ws');
const fs = require('fs');

const ws = new WebSocket.Server({port:4000, host:'localhost'});
ws.on('connection', (wss)=>{
    const duplex = WebSocket.createWebSocketStream(wss,{encoding:'utf-8'});
    let rfile = fs.createReadStream(`./Download/download.txt`);
    rfile.pipe(duplex);
});