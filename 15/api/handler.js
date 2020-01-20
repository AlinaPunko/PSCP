const Db = require('./../db/Db');
const url = require('url');
const db = new Db();

const config={
    faculties: "faculty",
    pulpits: "pulpit"
}

module.exports = {
    getAllHandler(request, response) {
        const object = config[url.parse(request.url).pathname.split('/')[2]];
        if (!object) {
            response.writeHead(400, {
                'Content-type': 'application/json'
            });
            response.end({
                error: "Wrong url"
            });
            return;
        }
        db.getAll(object)
            .then(records => {
                response.writeHead(200, {
                    'Content-type': 'application/json'
                });
                response.end(JSON.stringify(records));
            })
            .catch(error => {
                response.writeHead(400, {
                    'Content-type': 'application/json'
                });
                response.end(JSON.stringify({
                    error: String(error)
                }))
            });
    },

    createNewHandler(request, body, response) {
        console.log(body);
        const object = config[url.parse(request.url).pathname.split('/')[2]];
        if (!object) {
            response.writeHead(400, {
                'Content-type': 'application/json'
            });
            response.end({
                error: "Wrong url"
            });
            return;
        }
        db.insertOne(object, body)
            .then(record => {
                response.writeHead(200, {
                    'Content-type': 'application/json'
                });
                response.end(JSON.stringify(record));
            })
            .catch(error => {
                response.writeHead(400, {
                    'Content-type': 'application/json'
                });
                response.end(JSON.stringify({
                    error: String(error)
                }))
            });
    },

    updateHandler(request, body, response) {
        const object = config[url.parse(request.url).pathname.split('/')[2]];
        if (!object) {
            response.writeHead(400, {
                'Content-type': 'application/json'
            });
            response.end({
                error: "Wrong url"
            });
            return;
        }
        let id = body._id.repeat(1);
        delete body._id;

        db.updateOne(object, id, body)
            .then(record => {
                response.writeHead(200, {
                    'Content-type': 'application/json'
                });
                response.end(JSON.stringify(record));
            })
            .catch(error => {
                response.writeHead(400, {
                    'Content-type': 'application/json'
                });
                response.end(JSON.stringify({
                    error: String(error)
                }))
            });
    },

    deleteHandler(request, response) {
        const object = config[url.parse(request.url).pathname.split('/')[2]];
        const id = String(url.parse(request.url).pathname.split('/')[3]);
        if (!object || !id) {
            response.writeHead(400, {
                'Content-type': 'application/json'
            });
            response.end({
                error: "Wrong url"
            });
            return;
        }
        db.deleteOne(object, id)
            .then(record => {
                response.writeHead(200, {
                    'Content-type': 'application/json'
                });
                response.end(JSON.stringify(record));
            })
            .catch(error => {
                response.writeHead(200, {
                    'Content-type': 'application/json'
                });
                response.end(JSON.stringify({
                    error: String(error)
                }));
            });
    }
};