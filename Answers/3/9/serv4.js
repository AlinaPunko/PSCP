const http = require('http');
const url = require('url');

http.createServer((request, response)=>{
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
                response.end(JSON.stringify(resp));
            } catch (e) {
                console.log(e);
                response.writeHead(200, {
                    'Content-type': 'text/html'
                });
                response.end('<H1>Error!</H1>');
            }
        });
    }).listen(3000)