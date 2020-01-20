const sendmail = require('sendmail')();

module.exports = function (text){
    sendmail({from:'punko.alina2000@gmail.com', to:'punko.alina2000@gmail.com', html:text}, (err, reply)=>{
        console.log(err);
        console.log(reply);
    })
}