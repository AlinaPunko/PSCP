const net = require('net');
let HOST='0.0.0.0';
let PORT = 40000;
let sum=0;
let server=net.createServer();
server.on('connection',(sock)=>
{
    sock.on('data', (data)=>{
        console.log('Server data:', data, sum);
        sum+=data.readInt32LE();
    });
    let buf = Buffer.alloc(4);
    setInterval(()=>{buf.writeInt32LE(sum,0);sock.write(buf)},5000);
})
server.listen(PORT, HOST);
