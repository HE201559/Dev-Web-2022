const sql = require("./db");
const connexion = function () {
    this.id=connexion.id
  };

  connexion.findUtilisateur=(email, result) => {
    sql.query(`SELECT email, motdepasse, id from tb_Users WHERE tb_Users.email="${email}";`, (err,res) => {
        if(err) {
            console.log("error : ", err);
            result (null ,err);
            return;
            }
            console.log("donnees :" , res);
            result (null, res);
    })
  },

  connexion.findTousUtilisateurs=(result) => {
    sql.query(`SELECT email from tb_Users`, (err,res) => {
        if(err) {
            console.log("error : ", err);
            result (null ,err);
            return;
            }
            console.log("donnees :" , res);
            result (null, res);
    })
  },

  module.exports = connexion;
