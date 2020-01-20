const http = require('http');
const url = require('url');
const fs = require('fs');
const mp = require('multiparty');
const Stat = require('./m1')('./static');
const xmlbuilder = require('xmlbuilder');
const qs  =require('querystring');
const parseString = require('xml2js').parseString;

const dir = './static/';

const server = http.createServer((request, response) => {
    if (request.method === 'GET' && url.parse(request.url).pathname === '/headers') {
        let request_headers = '';
        for (key in request.headers) {
            request_headers += key + ': ' + request.headers[key] + '</br>'
        }
        let response_headers = '';
        for (key in response.headers) {
            response_headers += key + ': ' + response.headers[key] + '</br>'
        }
        console.log(response_headers);
        response.setHeader('MyHeader', 'value');
        response.writeHead(200, {
            'Content-type': 'text/html'
        });
        response.end(`<p>${request_headers}</p></br><p>${response_headers}</p>`)
    } else if (request.method === 'GET' && url.parse(request.url).pathname === '/close') {
        setTimeout(() => server.close(), 10000);
        response.writeHead(200, {
            'Content-type': 'text/html'
        });
        response.end(`<p>Server will close</p>`);

    } else if (request.method === 'GET' && url.parse(request.url).pathname === '/socket') {
        response.writeHead(200, {
            'Content-type': 'text/html'
        });
        response.write(`Local address = ${response.connection.localAddress}\n`);
        response.write(`Local port = ${responseconnection.localPort}\n`);
        response.write(`Remote address = ${response.connection.remoteAddress}\n`);
        response.write(`Remote port = ${response.connection.remotePort}\n`);
        response.end();
    } else if (request.method === 'GET' && url.parse(request.url).pathname === '/connection') {
        if (typeof url.parse(request.url).query != undefined) {
            let set = parseInt(url.parse(request.url, true).query.set, 10);
            if (!isNaN(set)) {
                server.keepAliveTimeout = set;
            }
            response.writeHead(200, {
                'Content-type': 'text/html'
            });
            response.end(`<h1>KeepAliveTimeout: ${server.keepAliveTimeout}</h1>`);
        } else {
            response.writeHead(200, {
                'Content-type': 'text/html'
            });
            response.end(`<h1>KeepAliveTimeout: ${server.keepAliveTimeout}</h1>`);
        }
    } else if (request.method === 'GET' && url.parse(request.url).pathname === '/parameter') {
        if (typeof url.parse(request.url).query != undefined) {
            let x = parseInt(url.parse(request.url, true).query.x, 10);
            let y = parseInt(url.parse(request.url, true).query.y, 10);
            if (!isNaN(x) && !isNaN(y)) {
                response.writeHead(200, {
                    'Content-type': 'text/html'
                });
                response.end(`<h1>${x+y} ${x-y} ${x*y} ${x/y}</h1>`);
            } else {
                response.writeHead(200, {
                    'Content-type': 'text/html'
                });
                response.end(`<h1>Error!</h1>`);
            }
        }
    } else if (request.method === 'GET' && url.parse(request.url).pathname === '/req-data') {
        response.writeHead(200, {
            'Content-type': 'text/html'
        });
        let buf ='';
        request.on('data',(data)=>{
            console.log('data', data.length);
            buf+=data;
        })
        request.on('end',()=>{
            console.log('buf',buf.length);
            response.end(buf);
        })
    } else if (request.method === 'GET' && /\/parameter\/\w+\/\w+/.test(url.parse(request.url).pathname)) {
        const arr = url.parse(request.url).pathname.split('/');
        const x = arr[2];
        const y = arr[3];
        if (isNaN(x) || isNaN(y)) {
            response.writeHead(200, {
                'Content-Type': 'text/plain; charset=utf-8'
            });
            response.end(request.url);
        } else {
            response.end(`<h1>${x+y} ${x-y} ${x*y} ${x/y}</h1>`);
        }
    } else if (request.method === 'GET' && url.parse(request.url).pathname === '/resp-status') {
        if (typeof url.parse(request.url).query != undefined) {
            let c = parseInt(url.parse(request.url, true).query.code, 10);
            let m = url.parse(request.url, true).query.mess;
            if (!isNaN(c)) {
                response.writeHead(200, m, {
                    'Content-type': 'text/html'
                });
                response.statusCode = c;
                response.end(`<h1>${response.statusCode} ${response.statusMessage}</h1>`);
            } else {
                response.writeHead(200, {
                    'Content-type': 'text/html'
                });
                response.end(`<h1>Error!</h1>`);
            }
        }
    } else if (request.method === 'GET' && url.parse(request.url).pathname === '/files') {
        fs.readdir( 'static', (error, files) => { 
            response.setHeader('X-static-files-count',files.length )
            response.writeHead(200, {
                'Content-type': 'text/html'
            });
            response.end(`<h1>Good!</h1>`);
         });
      
    } else if (request.method === 'GET' && /\/files\/.+/.test(url.parse(request.url).pathname)) {
        let arr = url.parse(request.url).pathname.split('/');
            let file_path = arr[2];
            fs.readFile(dir + file_path, (err, data) => {
               if (err) {
                   response.writeHead(404, {'Content-Type':'text/plain; charset=utf-8'});
                   response.end(`ERROR 404: ${file_path} is not found.`);
               } else {
                    Stat.sendFile(request, file_path , response, {'Content-type':'text/html'});
               }
            });    
    } else if (request.method === 'POST' && url.parse(request.url).pathname === '/json') {
        let result='';
        request.on('data', (data) => {result += data;});
        request.on('end', () => {
            try {
                let obj = JSON.parse(result);
                response.writeHead(200, {
                    'Content-type': 'application/json'
                });
                let o='';
                for(key in obj.o){
                    o=' '+ obj.o[key];
                }
                const resp = {
                    __comment:"Ответ.Лабораторная работа 8",
                    x_plus_y: obj.x+obj.y,
                    Concatinstion_s_o: obj.s+o,
                    Length_m:obj.m.length
                }
                console.log(resp);
                response.end(JSON.stringify(resp));
            } catch (e) {
                console.log(e);
                response.writeHead(200, {
                    'Content-type': 'text/html'
                });
                response.end('<H1>Error!</H1>');
            }
        });
        
    } else if (request.method === 'POST' && url.parse(request.url).pathname === '/upload') {
        let form = new mp.Form({uploadDir: './files'});
            form.on('file', (name, file) => {
                fs.copyFile(name, form.uploadDir, () => {
                    console.log('File is copied.');
                });
            });
            form.parse(request);
            let result = '';
            request.on('data', (data) => {
                result += data;
            });
            request.on('end', () => {
                response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                response.write('<h1>File upload</h1>');
                response.end(result);
            });       
    } else if (request.method === 'POST' && url.parse(request.url).pathname === '/xml') {
        let result = '';
        request.on('data', (data) => {result += data;});
        request.on('end', () => {
            parseString(result, (err, data) => {
               if (err) {
                console.log(err);
                response.writeHead(400, {'Content-Type':'text/html; charset=utf-8'});
                response.statusMessage = err;
                response.end();
               } else {
                response.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
                response.statusMessage = "OK";
                let rc = `<response request=${data.request.$.id}>Parse error</response>`;
                try {
                    let xmldoc = xmlbuilder.create('response');
                    xmldoc.att('request', data.request.$.id);
                    let sum = 0;
                    let concStr = '';
                    let arr_x = data.request.x;
                    let arr_m = data.request.m;
                    for (let i = 0; i < arr_x.length; i++) {
                        sum += Number(arr_x[i].$.value);
                    };
                    for (let i = 0; i < arr_m.length; i++) {
                        concStr += arr_m[i].$.value;
                    };
                    xmldoc.ele('sum').att('element', 'x').att('result', sum);
                    xmldoc.ele('concat').att('element', 'm').att('result', concStr);
                    rc = xmldoc.toString({pretty:true});
                } catch (e) {
                    console.log(e);
                }
                  response.end(rc);
               }
            });
        });
        request.on('error',()=>{console.log(error)});
    } else if (request.method === 'GET' && url.parse(request.url).pathname === '/upload') {
        fs.readFile('./files/webform.html', (err, data) => {
            response.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
            response.end(data);
        });
    } else if (request.method === 'POST' && url.parse(request.url).pathname === '/formparameter') {
        let result = '';
        console.log(request.method);
        request.on('data', (data) => {result += data;});
        request.on('end', () => {
            result += '<br/>';
            let o = qs.parse(result);
            for (let key in o) {
                result += `${key} = ${o[key]}<br/>`;
            }
            response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            response.write('<h1>Parameters: </h1>');
            response.end(result);
        });
    } 
})

server.listen(3000);