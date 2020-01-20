const http = require('http');
const url = require('url');

http.createServer((request, response)=>{
    let result=''
    request.on('data',(data)=>{result+=data;});
    request.on('end',()=>{
        const values = JSON.parse(result);
        console.log(values);
        response.writeHead(200, {'Content-type': 'text/html; charset=utf-8'});
        response.end(`<h1> ${values.x} ${values.y} ${values.s}</h1>`)
     }  
    )
}).listen(3000);
