const http = require('http');
const sendmail = require('sendmail')();
const url = require('url');
const fs = require('fs');

http.createServer((request, response) => {
    if (url.parse(request.url).pathname === '/' && request.method === 'GET') {
        const file = fs.readFileSync('./index.html');
        response.writeHead(200, {
            'Content-Type': 'text/html'
        });
        response.end(file);
    } else if (url.parse(request.url).pathname === '/' && request.method === 'POST') {
        let body = '';
        request.on('data', chunk =>{body+=chunk.toString()});
        request.on('end', ()=>{
            const data = JSON.parse(body);
            sendmail({from:data.sender, to: data.getter, html: data.message}, (err, reply)=>{
                console.log(err);
                console.log(reply);
            })
        })
    }
}).listen(3000);