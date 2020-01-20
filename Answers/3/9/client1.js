const http = require('http');

const options ={
    host:'localhost',
    path:'/mypath',
    port: 3000,
    method: 'GET'
};

const req = http.request(options, (res)=>{
    console.log(res.statusCode);
    console.log(res.statusMessage);
    console.log(res.socket.remoteAddress);
    console.log(res.socket.remotePort);

    let data='';
    res.on('data',(chunk)=>data+=chunk.toString('utf-8'));
    res.on('end', ()=>console.log(data));
})

req.end();