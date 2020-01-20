const http = require('http');
const url = require('url');

http.createServer((request, response)=>{
    let result=''
    request.on('data',(data)=>{result+=data;});
    request.on('end',()=>{
        console.log(result);
     }  
    )
}).listen(3000);