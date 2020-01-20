const http = require('http');
const fs = require('fs');

http.createServer(
    (request, response)=>{
        if(request.url=='/png'){
             const fileName = './pic.png';
            fs.stat(fileName, (err, stat)=>{
                if(err)
                    console.log((err));
                else{

                }
                const jpg = fs.readFile(fileName, (err,data)=>{
                    response.writeHead(200,{'Content-type':'image/jpeg', 'Content-length': stat.size});
                    response.end(data, 'binary');
                })
            })
        }

    }
).listen(3000);

