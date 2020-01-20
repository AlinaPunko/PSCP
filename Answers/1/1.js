const http = require('http');
const fs = require('fs');

http.createServer((request, response) => {
    if (request.url == '/html') {
        const fileName = './index.html';
        response.writeHead(200, {'Content-type': 'text/html'});
        const file = fs.readFileSync(fileName);
        response.end(file);
    }
}
).listen(3000);
