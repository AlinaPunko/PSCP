const http = require('http');
const url = require('url');

http.createServer((request, response)=>{
    if (typeof url.parse(request.url).query != undefined) {
        let x = parseInt(url.parse(request.url, true).query.x, 10);
        let y = parseInt(url.parse(request.url, true).query.y, 10);
        let s = url.parse(request.url, true).query.s;
        if (!isNaN(x) && !isNaN(y)) {
            response.writeHead(200, {
                'Content-type': 'text/html'
            });
            response.end(`<h1>${x} ${y} ${s}</h1>`);
        } else {
            response.writeHead(200, {
                'Content-type': 'text/html'
            });
            response.end(`<h1>Error!</h1>`);
        }
    }
}).listen(3000)