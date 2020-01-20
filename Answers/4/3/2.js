const http = require('http');
const url = require('url');
const fs = require('fs');

let fib = (n) => {
    return (n < 2) ? n : fib(n - 1) + fib(n - 2);
}

http.createServer((Request, Response)=>{
    if(url.parse(Request.url).pathname==='/fib'){
        if(typeof url.parse(Request.url, true).query.k!='undefined' ){
            const k=parseInt(url.parse(Request.url, true).query.k);
            if(Number.isInteger(k)){
                Response.writeHead(200,{'Content-Type':'application/json; charset=utf-8'});
                Response.end(JSON.stringify({k:k,fib:fib(k) }));
            }
        }
    }
    else if(url.parse(Request.url).pathname==='/'){
        const file = fs.readFileSync('./index.html');
        Response.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
        Response.end(file);
    }
}).listen(3000);