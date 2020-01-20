const udp = require('dgram');
const buffer = require('buffer');
const PORT=3000;
const client = udp.createSocket('udp4');
client.on('message',(msg, info)=> {
    console.log(msg.toString());
});
client.send('Client: Message 01', PORT,'localhost',(err)=>{
    if(err) client.close();
});