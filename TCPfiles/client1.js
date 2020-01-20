const net = require('net');
const fs = require('fs');

let HOST = '127.0.0.1';
let PORT = 40000;
let k ='';

const ws = fs.createWriteStream('./read.txt');

let client = new net.Socket();

client.connect(PORT, HOST, ()=>{});

client.on('data', (data)=>{k+=data});
client.on('end',()=>{
    fs.write(k);
})

client.on('close', ()=>{console.log('Client CLOSED');});
client.on('error', (e)=>{console.log('Client ERROR: '+e);});