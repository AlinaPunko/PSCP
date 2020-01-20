const net = require('net');

const HOST = '0.0.0.0';
const PORT1=40000;
const PORT2=50000;

let h =(n)=>{
    return (sock)=>{
        console.log(`CONNECTED ${n}: ` + sock.remoteAddress + ':'+ sock.remotePort);
        sock.on('data', (data)=>{
            console.log(`DATA ${n}:` + sock.remoteAddress + data);
            sock.write(`ECHO ${data}`);
        })
        sock.on('close',(data)=>{
            console.log(`CLOSED ${n}`+ sock.remoteAddress + ':'+ sock.remotePort);
        })
    }
}

net.createServer(h(PORT1)).listen(PORT1,HOST).on('listening',()=>{
    console.log( `TCP-server ${HOST}:${PORT1}`)
});
net.createServer(h(PORT2)).listen(PORT2,HOST).on('listening',()=>{
    console.log( `TCP-server ${HOST}:${PORT2}`)
});
