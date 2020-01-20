const sql = require('mssql/msnodesqlv8');

let config = {
    database: "MyBase",
     server: "ALINA\\SQLEXPRESS",
     driver: "msnodesqlv8",
     options: {
        trustedConnection: true
    }
    };

let dbreq = (mincap, maxcap, cb)=>{
    const ps = new sql.PreparedStatement();
    ps.input('mincap', sql.Int);
    ps.input('maxcap', sql.Int);
    ps.prepare("select auditorium_name, auditorium_capacity from AUDITORIUM where auditorium_capacity between @mincap AND @maxcap", (err)=>{
        if(err)
        cb(err,null);
        else ps.execute({mincap:mincap, maxcap:maxcap}, cb);
    })
}

sql.connect(config, err=>{
    if(err)
        console.log(err.message);
    else{
        dbreq(40,70, (err, result)=>{
            if(err)
                console.log(err.message);
            else console.log(result);
        })
    }
})