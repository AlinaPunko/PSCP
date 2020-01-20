const http = require('http');
const url = require('url');
const fs = require('fs');
const data = require('./DB.js');

const db = new data.DB();

db.on('GET', (req, res) => {
    res.end(JSON.stringify(db.select()));
})

db.on('POST', (req, res) => {
    req.on('data', data => {
        const t = JSON.parse(data);
        db.insert(t);
        res.end(JSON.stringify(t));
    });
})
db.on('DELETE', (req, res) => {
    req.on('data', data => {
        const t = JSON.parse(data);
        res.end(JSON.stringify(db.delete(t.id)));
    });
})
db.on('PUT', (req, res) => {
    req.on('data', data => {
        const t = JSON.parse(data);
        db.update(t);
    });
})
db.on('COMMIT', (req, res) => {
    db.commit();
})

http.createServer((req, res) => {
    if (url.parse(req.url).pathname === '/') {
        const file = fs.readFileSync('./index.html');
        res.writeHead(200, {
            'Content-type': 'text/html; charset=utf-8'
        });
        res.end(file);
    } else if (url.parse(req.url).pathname === '/api/db') {
        db.emit(req.method, req, res);
    }
}).listen(3000);