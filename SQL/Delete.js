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

let delAuditorium = (a,_cb) => {
    const cb = _cb ? _cb : (err, result) => {
        console.log('default cb')
    };
    const ps = new sql.PreparedStatement();
    ps.input('a', sql.NChar(10));
    ps.prepare('delete AUDITORIUM where auditorium=@a',
        (err) => {
            if (err)
                cb(err, null);
            else ps.execute({
                a: a
            }, (err, result) => {
                if (err)
                    cb(err, null);
                else cb(null, result);
            })
        });
}

sql.connect(config, err => {
    if (err)
        console.log(err.message);
    else {
        delAuditorium('322-1', (err, result) => {
            if (err)
                console.log(err.message);
            else console.log(result.rowsAffected[0]);
        });
    }
})