const http = require('http');
const fs = require('fs');

http.createServer(
    (request, response)=>{
        if(request.url=='/api/name'){
            const fileName = './text.txt';
            fs.stat(fileName, (err, stat)=>{
                if(err)
                    console.log((err));
                else{

                }
                const jpg = fs.readFile(fileName, (err,data)=>{
                    response.writeHead(200,{'Content-type':'text/plain', 'Content-length': stat.size});
                    response.end(data,);
                })
            })
        }

    }
).listen(3000);

