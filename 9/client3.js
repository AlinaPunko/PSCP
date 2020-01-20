const http = require('http');
const query = require ('querystring');

const options ={
    host:'localhost',
    path: '/mypath',
    port: 3000,
    method: 'POST'
};

const req = http.request(options, (res)=>{
    let data='';
    res.on('data',(chunk)=>data+=chunk.toString('utf-8'));
    res.on('end', ()=>console.log(data));
})
req.write(JSON.stringify({x:3,y:4,s:'xxx'}));
req.end();