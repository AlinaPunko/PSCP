const http = require('http');

http.createServer((Request, Response) => {
    let chunk = null;
    let newState = 'norm';
    process.stdout.write(newState + '->');
    process.stdin.setEncoding('utf-8');
    process.stdin.on('readable', () => {
        while ((chunk = process.stdin.read()) != null) {
            if (chunk.trim() == 'exit') {
                process.exit(0);
            } else if (chunk.trim() == 'norm' || chunk.trim() == 'idle' || chunk.trim() == 'stop') {
                process.stdout.write(newState + '-->' + chunk.trim() + '\n');
                newState = chunk.trim();
                Response.write(`<h1>${newState}</h1>`)
            } else {
                process.stdout.write(chunk.trim() + '\n');
            }
            process.stdout.write(newState + '->');
        }
    })
}).listen(3000);