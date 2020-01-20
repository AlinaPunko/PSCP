const util = require('util');
const ee = require('events');

const db_data = [{
        id: 1,
        name: 'Alina',
        bday: '2000-05-23'
    },
    {
        id: 2,
        name: 'Senia',
        bday: '2000-01-03'
    },
    {
        id: 3,
        name: 'Lesya',
        bday: '2000-04-02'
    }
];

function DB() {
    this.select = () => {
        return db_data;
    };
    this.insert = (r) => {
        db_data.push(r);
    };
    this.delete = (id) => {
        const elem = db_data.find((element) => element.id == id);
        if (typeof elem != 'undefined') {
            db_data.splice(db_data.indexOf(elem), 1);
            return elem;
        }
    }
    this.update = (r) => {
        const elem = db_data.find((element) => element.id == r.id);
        console.log(elem);
        if (typeof elem != 'undefined') {
            db_data.splice(db_data.indexOf(elem), 1);
        }
        if (r.name != '')
            elem.name = r.name;
        if (r.bday != '')
            elem.bday = r.bday;
        db_data.push(elem);
        console.log(db_data);
    }
    this.commit = () => {}
}

util.inherits(DB, ee.EventEmitter);
exports.DB = DB;