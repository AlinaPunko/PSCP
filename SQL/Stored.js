const sql = require('mssql/msnodesqlv8');

let config = {
    database: "MyBase",
    server: "ALINA\\SQLEXPRESS",
    driver: "msnodesqlv8",
    options: {
        trustedConnection: true
    },
    pool: {
        max: 10,
        min: 0,
        softIdleTimeoutMillis: 5000,
        idleTimeoutMillis: 10000
    }
};

let get_teachers = (p, _cb) => {
    const cb = _cb?_cb:(err, result) => {
        console.log('default cb')
    };
    const rq = new sql.Request();
    rq.input('p', sql.Char(20), p);
    rq.execute("get_teachers_by_pulpit", (err, result)=>{processing_result(err, result); cb(err,result)});
    rq.on('info', message=>console.log('info', message));
}

let processing_result=(err, result)=>{
    if(err)
    console.log(err.message);
    else{
        console.log(result.recordset);
    }
}

sql.connect(config, err=>{
    if(err)
        console.log(err.message);
    else{
        get_teachers('ИСиТ', (err, result) => {
            if (err)
                console.log(err.message);
        });
    }
})