const http = require('http');
const query = require ('querystring');

const parms =query.stringify({x:3,y:4,s:'xxx'});
const path = `/mypath?${parms}`;
const options ={
    host:'localhost',
    path: path,
    port: 3000,
    method: 'GET'
};

const req = http.request(options, (res)=>{
    let data='';
    res.on('data',(chunk)=>data+=chunk.toString('utf-8'));
    res.on('end', ()=>console.log(data));
})

req.end();