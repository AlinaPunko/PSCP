const net = require('net');
const fs = require('fs');

let HOST = '0.0.0.0';
let PORT = 40000;

let k = '';

let ws = fs.createWriteStream('./1.txt');

let server = net.createServer((sock)=>{
    sock.on('connection', ()=>{ rs.pipe(sock);});

    sock.on('close', ()=>{
        console.log('Server CLOSED: '+ sock.remoteAddress+' '+sock.remotePort);
    });
    sock.on('error', ()=>{
        console.log('Server ERROR: '+ sock.remoteAddress+' '+sock.remotePort);
    });
});

server.on('listening', ()=>{console.log('TCP-server '+HOST+':'+PORT);});
server.on('error', (e)=>{console.log('TCP-server error'+e);});

server.listen(PORT, HOST);