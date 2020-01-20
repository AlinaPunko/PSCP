const http = require('http');
const fs = require('fs');
const url = require('url');
const RPCWebSocket = require('rpc-websockets').Server;

const socket = new RPCWebSocket({
    port: 5000,
    host: 'localhost',
});
socket.event('changed');

http.createServer((request, response) => {
    fs.createReadStream('./backup/20200619460_StudentList.json').pipe(fs.createWriteStream('./1.json'));
    if (request.url === '/' && request.method === 'GET') {
        fs.readFile('./StudentList.json', (err, data) => {
            response.setHeader('Content-Type', 'application/json');
            if (err) {
                response.end(JSON.stringify({
                    error: 1,
                    message: "Ошибка чтения файла"
                }));
            }
            response.end(data);
        })
    } else if (/\/backup\/\d+/.test(url.parse(request.url).pathname)&& request.method === 'DELETE') {
        let flag = false;
            fs.readdir('./backup', (err, files) => {
                for (let i = 0; i < files.length; i++) {
                    if (files[i].match(/\d{8}/)[0] > Number(url.parse(request.url).pathname.match(/\d+/))) {
                        flag = true;
                        fs.unlink(`./backup/${files[i]}`, (e) => {
                            if (e) {
                                console.log('Error');
                                response.end('Error');
                            } else {
                                console.log('Ok');
                                response.end('Ok');
                            }
                        });
                    }
                }
                if (!flag) {
                    response.setHeader('Content-Type', 'text/plain');
                    response.end('No files');
                }
            });
       
    } else if (/\/\d+/.test(url.parse(request.url).pathname) && request.method === 'GET') {
        fs.readFile('./StudentList.json', (err, data) => {
            response.setHeader('Content-Type', 'application/json');
            if (err) {
                response.end(JSON.stringify({
                    error: 1,
                    message: "Ошибка чтения файла"
                }));
            }
            const id = Number(url.parse(request.url).pathname.split('/')[1])
            const student = JSON.parse(data).find(item => item.id === id);
            if (student == null) {
                response.end(JSON.stringify({
                    error: 2,
                    message: `Студент с id ${id} не существует`
                }));
            }
            socket.emit('changed');
            response.end(JSON.stringify(student));
        })
    } else if (request.url === '/' && request.method === 'POST') {
        let body = '';
        request.on('data', function (data) {
            body += data;
        });
        request.on('end', () => {
            fs.readFile('./StudentList.json', (err, StudentList) => {
                response.setHeader('Content-Type', 'application/json');
                if (err) {
                    response.end(JSON.stringify({
                        error: 1,
                        message: "Ошибка чтения файла"
                    }));
                }
                const id = JSON.parse(body).id;
                const students = JSON.parse(StudentList);
                const student = students.find(item => item.id === id);
                if (student != null) {
                    response.end(JSON.stringify({
                        error: 3,
                        message: `Студент с id ${id} уже существует`
                    }));
                } else {
                    students.push(JSON.parse(body));
                    fs.writeFile('./StudentList.json', JSON.stringify(students), (e) => {
                        if (e) {
                            response.end(JSON.stringify({
                                error: 4,
                                message: `Ошибка записи`
                            }));
                        }
                        socket.emit('changed');
                        response.end(body);
                    })
                }
            })
        })
    } else if (request.url === '/' && request.method === 'PUT') {
        let body = '';
        request.on('data', function (data) {
            body += data;
        });
        request.on('end', () => {
            fs.readFile('./StudentList.json', (err, StudentList) => {
                response.setHeader('Content-Type', 'application/json');
                if (err) {
                    response.end(JSON.stringify({
                        error: 1,
                        message: "Ошибка чтения файла"
                    }));
                }
                const id = JSON.parse(body).id;
                const students = JSON.parse(StudentList);
                const student = students.find(item => item.id === id);
                if (student == null) {
                    response.end(JSON.stringify({
                        error: 3,
                        message: `Студент с id ${id} не существует`
                    }));
                } else {
                    console.log(student);
                    console.log(JSON.parse(body))
                    students.splice(students.indexOf(student), 1)
                    students.unshift(JSON.parse(body));
                    fs.writeFile('./StudentList.json', JSON.stringify(students), (e) => {
                        if (e) {
                            response.end(JSON.stringify({
                                error: 4,
                                message: `Ошибка записи`
                            }));
                        }
                        socket.emit('changed');
                        response.end(body);
                    })
                }
            })
        })
    } else if (/\/\d+/.test(url.parse(request.url).pathname) && request.method === 'DELETE') {
        console.log(true);
        fs.readFile('./StudentList.json', (err, StudentList) => {
            response.setHeader('Content-Type', 'application/json');
            if (err) {
                response.end(JSON.stringify({
                    error: 1,
                    message: "Ошибка чтения файла"
                }));
            }
            const id = Number(url.parse(request.url).pathname.split('/')[1])
            const students = JSON.parse(StudentList);
            const student = students.find(item => item.id === id);
            if (student == null) {
                response.end(JSON.stringify({
                    error: 3,
                    message: `Студент с id ${id} ну существует`
                }));
            } else {
                students.shift(students.indexOf(student));
                fs.writeFile('./StudentList.json', JSON.stringify(students), (e) => {
                    if (e) {
                        response.end(JSON.stringify({
                            error: 4,
                            message: `Ошибка записи`
                        }));
                    }
                    socket.emit('changed');
                    response.end(JSON.stringify(student));
                })
            }
        })
    } else if (request.url === '/backup' && request.method === 'POST') {
        const date = new Date();
        const newName = `${date.getFullYear()}${date.getMonth()}${date.getDay()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
        setTimeout(()=>{fs.copyFile('./StudentList.json',`./backup/${newName}_StudentList.json`, (err)=>{
            if(err){
               console.log('error');
            }
            socket.emit('changed');
        })}, 2000);
    } else if(request.url === '/backup' && request.method === 'GET'){
        fs.readdir('./backup', (err, files) => {
            response.setHeader('Content-Type', 'application/json');
            let json = [];
            for (let i = 0; i < files.length; i++) {
                json.push({
                    id: i,
                    name: files[i]
                });
            }
            response.end(JSON.stringify(json));
            socket.emit('changed');
        });
    }

}).listen(3000);