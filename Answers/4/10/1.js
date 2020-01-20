const http = require('http');
const WebSocket= require('ws');
const fs = require('fs');

http.createServer((request, response)=>{
    if(request.method==='GET' && request.url=='/start')
    {
        response.writeHead(200,{'Content-type':'text/html; charset=utf-8'});
        const file = fs.readFileSync('index.html');
        response.end(file);
    }
    else{
        response.writeHead(400,{'Content-type':'text/html'});
        response.end('<h1>Error</h1>');
    }
}).listen(3000);

let k=0;
const wsserver = new WebSocket.Server({port:4000, host:'localhost', path:'/wsserver'});
wsserver.on('listening',()=>{console.log('listening')});
wsserver.close();
wsserver.on('connection', (ws)=>{
    console.log('connection');
    let result;
    ws.on('message',message=>{
        result=message;
        {console.log(message)};
    });
    setInterval(()=>{ws.send(`<h1>${result}->${++k}</h1>`)},5000)
});
wsserver.on('error',(error)=>{console.log(error.message)});