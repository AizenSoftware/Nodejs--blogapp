const mysql = require("mysql2");
const config = require("../config");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(config.db.database,config.db.user,config.db.password,{
    dialect:"mysql",
    host:config.db.host
})

async function connect(){
    try {
        await sequelize.authenticate();
        console.log('Mysql veritabanına bağlantısı yapıldı');
      } catch (error) {
        console.error('Bağlantı hatası:', error);
      }
}
connect();

module.exports = sequelize;

// let connetion = mysql.createConnection(config.db);

// connetion.connect((err)=>{
//     if(err){
//         return console.log(err);
//     }
//     console.log("Mysql veritabanına bağlantısı yapıldı");
// })

// module.exports = connetion.promise();