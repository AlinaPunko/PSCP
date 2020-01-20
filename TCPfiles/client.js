const net = require('net');
const fs = require('fs');

let HOST = '127.0.0.1';
let PORT = 40000;

const rs = fs.createReadStream('./read.txt');

let client = new net.Socket();

client.connect(PORT, HOST, ()=>{
    rs.pipe(client);
});

client.on('data', (data)=>{console.log('From SERVER: ', data.readInt32LE());});

client.on('close', ()=>{console.log('Client CLOSED');});
client.on('error', (e)=>{console.log('Client ERROR: '+e);});