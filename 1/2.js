const http = require('http');
const fs = require('fs');

http.createServer(
    (request, response)=>{
        fs.stat('./belka.jpg', (err, stat)=>{
if(err)
    console.log((err));
else{

}
const jpg = fs.readFile('./belka.jpg', (err,data)=>{
    response.writeHead(200,{'Content-type':'image/jpeg', 'Content-length': stat.size});
    response.end(data, 'binary');
})
        })
    }
).listen(3000);
