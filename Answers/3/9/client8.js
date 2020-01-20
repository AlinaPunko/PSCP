  
const http = require('http');
const fs = require('fs');

const file = fs.createWriteStream('qwerty.txt');

let options = {
    host: 'localhost',
    path: '/files/qwerty.txt',
    port: 3000,
    method: 'GET',
};

const req = http.request(options, (res) => {
    res.pipe(file);
   });

req.on('error', (err) => {
    console.log('http.request: error: ', err.message);
});

req.end();