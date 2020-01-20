const rpcWSS = require('rpc-websockets').Server;

let server = new rpcWSS({port:5000, host:'localhost'});
server.register('A',()=>console.log('event A'));
server.register('B',()=>console.log('event B'));
server.register('C',()=>console.log('event C'));