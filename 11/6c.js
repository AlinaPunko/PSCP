const rpcWSC = require('rpc-websockets').Client;

const ws=new rpcWSC('ws://localhost:5000');
ws.on('open',()=>{
    ws.subscribe('C');
    ws.on('C',()=>{console.log(' event C')});
})
