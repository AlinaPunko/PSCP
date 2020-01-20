const WebSocket = require('ws');
const fs = require('fs');

const ws = new WebSocket.Server({port:4000, host:'localhost', path:'/upload'});
ws.on('connection', (wss)=>{
    const duplex = WebSocket.createWebSocketStream(wss,{encoding:'utf-8'});
    let wfile = fs.createWriteStream(`./upload/file.txt`);
    duplex.pipe(wfile);
});