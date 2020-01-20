const rpcWSC = require('rpc-websockets').Client;
const readline = require('readline');

const ws=new rpcWSC('ws://localhost:5000');
ws.on('open',()=>{
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
      });
      
      console.log('Enter events A, B or C');
      rl.on('line', function(line){
          ws.notify(line);
      })
})