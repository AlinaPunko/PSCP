const WebSocket= require('ws');

const ws = new WebSocket('ws://localhost:4000/wsserver')
let k = 0;

ws.on('open', ()=>{
    setInterval(() => {
        ws.send(++k);
    }, 3000);
    setTimeout(()=>{ws.close()}, 25000)
})

ws.on('message', (message) => {
    console.log(message);
});

ws.onerror = (e) => {
    console.log(e.message);
}