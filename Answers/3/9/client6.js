const http = require('http');
const fs = require('fs');

let bound="hello";
let body=`--${bound}--`;
body+='Content-disposition:form-data; name="file"; filename="MyFile.txt"\r\n';
body+='content-type:text/plain\r\n\r\n';
body+=fs.readFileSync('MyFile.txt');
body+=`\r\n\--${bound}--\r\n`;

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
        console.log(JSON.parse(data))
    });
})

req.end(body);