const http = require('http');
const handler = require('./api/handler');

http.createServer((request,response)=>{
    if(request.method=="GET"){
        handler.getAllHandler(request, response);
    }
    if(request.method=="POST"){
        let body = '';
        request.on('data', function (data) {
            body += data;
        });
        request.on('end', () => {handler.createNewHandler(request,JSON.parse(body), response);})
    }
    if(request.method=="PUT"){
        let body = '';
        request.on('data', function (data) {
            body += data;
        });
        request.on('end', () => {handler.updateHandler(request,JSON.parse(body), response);})
    }
    if(request.method=="DELETE"){
       handler.deleteHandler(request, response);
    }
}).listen(3000);
