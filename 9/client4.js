const http = require('http');
const query = require('querystring');

const options = {
    host: 'localhost',
    path: '/mypath',
    port: 3000,
    method: 'POST'
};

const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk.toString('utf-8'));
    res.on('end', () => {
        console.log(res.statusCode);
        console.log(JSON.parse(data))
    });
})
req.write(JSON.stringify({
    "__comment": "Запрос",
    "x": 1,
    "y": 2,
    "s": "Сообщение",
    "m": ["a", "b", "c", "d"],
    "o": {
        "surname": "qwerty",
        "name": "yuytu"
    }
}));
req.end();