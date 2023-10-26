const mysql = require("mysql2");
const config = require("../config");

let connetion = mysql.createConnection(config.db);

connetion.connect((err)=>{
    if(err){
        return console.log(err);
    }
    console.log("Mysql veritabanına bağlantısı yapıldı");
})

module.exports = connetion.promise();