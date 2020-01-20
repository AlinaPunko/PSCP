const http = require('http');
const fs = require('fs');
const sql = require('mssql/msnodesqlv8');

let GET_handler = (req, res) => {
    const parseUrl = require('url').parse(req.url);

    if (parseUrl.pathname.includes("/api/")) {
        var table = parseUrl.pathname.replace("/api/", "");
        pool.connect().then(() => {
            pool.request().query(`select * from ${table}`, (err, result) => {
                if (err) {
                    res.end(JSON.stringify({
                        code: 1,
                        message: `row not select from table ${table} `
                    }))
                } else {
                    console.log(result.recordset);
                    res.end(JSON.stringify(result.recordset));
                }
                pool.close();
            });
        });
    } else if (parseUrl.pathname === '/') {
        let html = fs.readFileSync('14-03.html');
        res.writeHead(200, {
            'Content-Type' : 'text/html;charset=utf-8'
        });
        res.end(html);
    }
}

let POST_handler = (req, res) => {
    var parseUrl = require('url').parse(req.url);
    var insertedObject = '';
    if (parseUrl.pathname.includes("/api/")) {
        var table = parseUrl.pathname.replace("/api/", "");
        req.on('data', (data) => {
            insertedObject += data;
        });
        req.on('end', () => {
            try {
                let obj = JSON.parse(insertedObject);
                selectRequest(table);
                setTimeout(() => {
                    var equal = true;
                    for (i in obj)
                        if (!objects[0].hasOwnProperty(i))
                            equal = false;
                    if (equal) {
                        pool.connect().then(() => {
                            var keys = Object.keys(obj);
                            var array = Object.values(obj);
                            var k = "";
                            var v = "";
                            for (var i = 0; i < keys.length; i++) {
                                if (i != 0) {
                                    k += ` , ${keys[i]} `;
                                    v += ` , '${array[i]}' `;
                                } else {
                                    k += ` ${keys[i]} `;
                                    v += ` '${array[i]}' `;
                                }
                            }
                            pool.request().query(`insert into ${table} (${k}) values (${v})`, (err, result) => {
                                if (err) {
                                    res.end(JSON.stringify({
                                        code: 1,
                                        message: `row not added to table ${table}`
                                    }));
                                } else {
                                    console.log("Inserted");
                                    res.end(JSON.stringify({message: `data inserted successfully`}));
                                }
                                pool.close();
                            });
                        });
                    }
                }, 1000);
            } catch {
                console.log("PARSE ERROR");
            }
        })
    }
}

let PUT_handler = (req, res) => {
    var parseUrl = require('url').parse(req.url);
    var insertedObject = '';
    if (parseUrl.pathname.includes("/api/")) {
        var table = parseUrl.pathname.replace("/api/", "");
        req.on('data', (data) => {
            insertedObject += data;
        });
        req.on('end', () => {
            try {
                let obj = JSON.parse(insertedObject);
                selectRequest(table);
                setTimeout(() => {
                    var equal = true;
                    for (i in obj)
                        if (!objects[0].hasOwnProperty(i))
                            equal = false;
                    if (equal) {
                        pool.connect().then(() => {
                            var keys = Object.keys(obj);
                            var array = Object.values(obj);
                            var updatedValues = "";
                            for (var i = 0; i < keys.length; i++) {
                                console.log('updatedValues: ' + updatedValues);
                                if (i != 0) {
                                    updatedValues += `, ${keys[i]} = '${array[i]}' `;
                                } else {
                                    updatedValues += `${keys[i]} = '${array[i]}' `;
                                }
                            }
                            pool.request().query(`select * from ${table} where ${keys[0]} = '${array[0]}'`, function(err, results)  {
                                const users = results.recordset;
                                if (err || Object.keys(users).length === 0) {
                                    res.end(JSON.stringify({
                                        code: 2,
                                        message: "no such data"
                                    }));
                                    pool.close();
                                }
                                else{
                            pool.request().query(`update ${table} set ${updatedValues} where ${keys[0]} = '${array[0]}'`, (err, result) => {
                                console.log(`update ${table} set ${updatedValues} where ${keys[0]} = '${array[0]}'`);
                                if (err) {
                                    res.end(JSON.stringify({
                                        code: 1,
                                        message: `ERROR: Table ${table} row not updated `
                                    }));
                                } else {
                                    console.log("Updated");
                                    res.end(JSON.stringify({message: `data updated successfully`}));
                                }
                                pool.close();
                            });
                                }

                            });
                        });
                    }
                }, 1000);
            } catch {
                console.log("PARSE ERROR");
            }
        })
    }
}

let DELETE_handler = (req, res) => {
    const parseUrl = require('url').parse(req.url);
    let insertedObject = ''
    req.on('data',(data)=>{insertedObject+=data});
    req.on('end',()=>{
        if (parseUrl.pathname.includes("/api/")) {
            var str = parseUrl.pathname.split("/");  
            const table = str[2];    
            const id = JSON.parse(insertedObject).id;     
            pool.connect().then(() => {
                console.log(`delete from ${table} where ${table} = '${id}'`);
                pool.request().query(`select * from ${table} where ${table} = '${id}'`, function(err, results)  {
                    const users = results.recordset;  
                    if (err || Object.keys(users).length === 0) {
                        res.end(JSON.stringify({
                            code: 2,
                            message: "ERROR: no such data"
                        }));
                        pool.close();
                    }
                    else{
                        pool.request().query(`delete from ${table} where ${table} = '${id}'`, function(err, results)  {
                            if (err) {
                                res.end(JSON.stringify({
                                    code: 1,
                                    message: `ERROR: row not deleted from table ${table} `
                                }));
                            } else {
                                console.log("Deleted");
                                res.end(JSON.stringify({message: `data deleted successfully`}));
                            }
                            pool.close();
                        });
                    }   
                });    
            });   
        }  
    })
}
OTHER_handler = (req, res) => {
    res.end(JSON.stringify({message: `this method is not processed by the server`}));
}

let http_handler = (req, res) => {
    res.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8"
    })
    switch (req.method) {
        case "GET": GET_handler(req, res); break;
        case "POST": POST_handler(req, res); break;
        case "PUT": PUT_handler(req, res); break;
        case "DELETE": DELETE_handler(req, res); break;
        default: OTHER_handler(req, res); break;
    }
}

let server = http.createServer();
server.listen(3000, (v) => {
    console.log("server.listen(3000)");
}).on('error', (e) => {
    console.log("server.listen(3000); error: ", e);
}).on('request', http_handler);


const pool = new sql.ConnectionPool({
   database: "MyBase",
    server: "ALINA\\SQLEXPRESS",
    driver: "msnodesqlv8",
   options: {
        trustedConnection: true
    }

});

var objects;

function selectRequest(table) {
    pool.connect().then(() => {
        pool.request().query(`select * from ${table}`, (err, result) => {
            if (err) {
                res.end(JSON.stringify({
                    code: 1,
                    message: `Table ${table} does not exist`
                }));
            } else {
                objects = result.recordset;
            }
            pool.close();
        });
    });
}










