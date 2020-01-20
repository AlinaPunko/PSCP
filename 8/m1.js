function Stat(sfn = './static') {
    this.STATIC_FOLDER = sfn;
    let pathStatic = (fn) => {
        return `${this.STATIC_FOLDER}${fn}`;
    }
    this.writeHTTP404 = (res) => {
        res.statusCode = 404;
        res.statusMessage = "Resourse not found";
        res.end("Resourse not found");
    }

    let fs = require('fs');
    let pipeFile = (req,path, res, headers) => {
        res.writeHead(200, headers);
        fs.createReadStream(path).pipe(res);
    }
    this.isStatic = (ext, fn) => {
        let reg = new RegExp(`^\/.+\.${ext}$`);
        return reg.test(fn);
    }
    this.sendFile = (req,path,  res, headers) => {
        console.log(path);
        fs.access('./static/'+path, fs.constants.R_OK, err =>{
            if (err)
                this.writeHTTP404(res);
            else pipeFile(req, './static/'+path, res, headers);
        });
    }
}

module.exports = (parm)=>{
    return new Stat(parm);
}