const net = require('net');

const HOST="127.0.0.1";
const PORT = process.argv[2]?process.argv[2]:40000;

let client = new net.Socket();

client.connect(PORT, HOST,()=>{
    console.log( `CLIENT CONNECTED $: ` + client.remoteAddress + ':'+ client.remotePort);

    let k=0;
    timrId = setInterval(()=>{client.write(`client ${k++}`)}, 1000);
    setTimeout(()=>{clearInterval(timrId);client.end()},30000);
})

client.on('data',(data)=>{console.log('DATA ', data.toString())})
.on('close',()=>{console.log('Closed')})
.on('error',(err)=>{console.log(err.message)});