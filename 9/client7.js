const http = require('http');
const fs = require('fs');

let bound="hello";
let body=`--${bound}--`;
body+='Content-disposition:form-data; name="file"; filename="File.txt"\r\n';
body+='content-type:application/octet-stream\r\n\r\n';

const options = {
    host: 'localhost',
    path: '/mypath',
    port: 3000,
    method: 'POST',
    headers:{'content-type':'multipart/form-data; boundary='+bound}
};

const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk.toString('utf-8'));
    res.on('end', () => {
        console.log(res.statusCode);
    });
})

req.write(body);

let stream = new fs.ReadStream('MyFile.txt');
stream.on('data',(chunk)=>{req.write(chunk); console.log(Buffer.byteLength(chunk))});
stream.on('end',()=>req.end(`\r\n--${bound}--\r\n`));