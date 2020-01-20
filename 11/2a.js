const WebSocket = require('ws');
const fs = require('fs');

const ws = new WebSocket('ws://localhost:4000');
ws.on('open', ()=>{
    const duplex = WebSocket.createWebSocketStream(ws,{encoding:'utf-8'});
    let wfile = fs.createWriteStream(`./file.txt`);
    duplex.pipe(wfile);
});

