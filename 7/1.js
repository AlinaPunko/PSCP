const http = require('http');
const stat = require('./m1')('./static');

let handler = (req, res) => {
    if(req.method!='GET')
    {
        res.statusCode = 405;
        res.statusMessage = "Wrong query";
        res.end("Wrong query");
        return;
    }
    if (stat.isStatic('html', req.url)) stat.sendFile(req, res, {
        'Content-Type': 'text/html; charset=utf-8'
    });
    else if (stat.isStatic('css', req.url)) stat.sendFile(req, res, {
        'Content-Type': 'text/css; charset=utf-8'
    });
    else if (stat.isStatic('js', req.url)) stat.sendFile(req, res, {
        'Content-Type': 'text/javascript; charset=utf-8'
    });
    else if (stat.isStatic('docx', req.url)) stat.sendFile(req, res, {
        'Content-Type': 'application/msword'
    });
    else if (stat.isStatic('mp4', req.url)) stat.sendFile(req, res, {
        'Content-Type': 'video/mp4'
    });
    else if (stat.isStatic('png', req.url)) stat.sendFile(req, res, {
        'Content-Type': 'image/png'
    });
        else if (stat.isStatic('json', req.url)) stat.sendFile(req, res, {
        'Content-Type': 'application/json'
    });
    else if (stat.isStatic('xml', req.url)) stat.sendFile(req, res, {
        'Content-Type': 'application/xml'
    });
    else stat.writeHTTP404(res);
}


let server = http.createServer();
server.listen(3000).on('error', (e) => {
    console.log(e.code)
}).on('request', handler);