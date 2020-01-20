const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer((request, response)=>{
    let result=''
    let file = fs.createReadStream(`./files/qwerty.txt`);
    file.pipe(response)
}).listen(3000);