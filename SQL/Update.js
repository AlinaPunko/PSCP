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

let updAuditorium = (a, an, ac, at, _cb) => {
    const cb = _cb?_cb:(err, result) => {
        console.log('default cb')
    };
    const ps = new sql.PreparedStatement();
    ps.input('a', sql.NChar(10));
    ps.input('an', sql.NVarChar);
    ps.input('ac', sql.Int);
    ps.input('at', sql.NChar(10));
    ps.prepare('update AUDITORIUM set auditorium_name=@an, auditorium_capacity=@ac, auditorium_type=@at where auditorium=@a',
    (err)=>{
        if(err)
        cb(err,null);
        else ps.execute({a:a,an:an,ac:ac,at:at}, (err, result)=>{
            if(err)
                cb(err,null);
                else cb(null, result);
        })
    });
}

sql.connect(config, err=>{
    if(err)
        console.log(err.message);
    else{
       updAuditorium('322-1', '322-1 LeverX', 80, 'ЛК', (err, result)=>{});
    }
})