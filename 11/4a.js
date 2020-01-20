const WebSocket = require('ws');

let parm0 = process.argv[0];
let parm1 = process.argv[1];
let parm2 = process.argv[2];

let prfx = typeof parm2 == 'undefined' ? 'A' : parm2;
const ws = new WebSocket('ws://localhost:4000');

ws.on('open', () => {
    ws.send(JSON.stringify({client: prfx, timestamp : new Date().toDateString()}))
})
ws.on('message', data=>{console.log(data)});