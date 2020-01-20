const http = require('http');

http.createServer((request, response)=>{
    response.writeHead(200,{'Content-type':'text/html; charset=utf-8'});
    response.end('<h1>Hello</h1>');
}).listen(3000)