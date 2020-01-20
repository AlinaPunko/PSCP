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

let insAuditorium = (a, an, ac, at, _cb) => {
    const cb = _cb?_cb:(err, result) => {
        console.log('default cb')
    };
    const ps = new sql.PreparedStatement();
    ps.input('a', sql.NChar(10));
    ps.input('an', sql.NVarChar);
    ps.input('ac', sql.Int);
    ps.input('at', sql.NChar(10));
    ps.prepare('insert AUDITORIUM (auditorium, auditorium_name, auditorium_capacity, auditorium_type) values (@a, @an, @ac, @at)',
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
       insAuditorium('322-1', '322-1 LeverX', 24, 'ЛБ-СК', (err, result)=>{});
       insAuditorium('323-1', '323-1 iTechArt', 24, 'ЛБ-СК', (err, result)=>{});
    }
})