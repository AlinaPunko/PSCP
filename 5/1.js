const http = require('http');
const url = require('url');
const fs = require('fs');
const data = require('./DB.js');
const readline = require('readline');

const db = new data.DB();
const stat_module = require('./statistics_module');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let timer_sd;
let timer_sc;
let timer_ss;
let stat;

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

const server = http.createServer((req, res) => {
    if (url.parse(req.url).pathname === '/') {
        const file = fs.readFileSync('./index.html');
        res.writeHead(200, {
            'Content-type': 'text/html; charset=utf-8'
        });
        res.end(file);
    } else if (url.parse(req.url).pathname === '/api/db') {
        db.emit(req.method, req, res);
    }else if (url.parse(req.url).pathname === '/api/ss') {
        res.writeHead(200, {'Content-Type':'application/json; charset=utf-8'});
        res.end(JSON.stringify((stat != null)?stat.getJSON():null));

    }
}).listen(3000);

server.on('request', () => {
    if (stat != null && stat.active) {
        stat.request();
    }
});

rl.on('line', (input) => {
if (input === 'sd' && timer_sd != null) {
    console.log('Timer is canceled.');
    clearTimeout(timer_sd);
}
if (input === 'sc' && timer_sc != null) {
    console.log('Timer is canceled.');
    clearTimeout(timer_sc);
}
if (/sd \d+/.test(input)) {
    if (timer_sd != null) {
        clearTimeout(timer_sd);
    }
    let start = Date.now();
    timer_sd = setTimeout(() => {
        console.log('Passed time: ' + (Date.now() - start));
        server.close(() => {
            console.log('Server terminate');
            process.exit(1);
        });
    }, Number(input.match(/\d+/g)*1000));
}
if (/sc \d+/.test(input)) {
    timer_sc = setInterval(() => {
        db.commit();
        if(stat != null && stat.active) {
            stat.commit(()=>{Console.log('commit')});
        }
    }, Number(input.match(/\d+/g)*1000));
    timer_sc.unref();
}
if (/ss \d+/.test(input)) {
    stat = new stat_module();
    timer_ss = setTimeout(() => {
        stat.end();
        console.log("Requests: " + stat.requests + "\nCommits: " + stat.commits), Number(input.match(/\d+/g))
    }, Number(input.match(/\d+/g)*1000));
    timer_ss.unref();
}
});