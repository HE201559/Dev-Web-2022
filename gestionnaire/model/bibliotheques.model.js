const sql = require("./db");
const bibliotheques = function () {
    this.id=bibliotheques.id
  };

  bibliotheques.findBibliotheques=(email, result) => {
    sql.query(`SELECT * from tb_UsersBiblio WHERE emailUser="${email}";`, (err,res) => {
        if(err) {
            console.log("error : ", err);
            result (null ,err);
            return;
            }
            console.log("donnees :" , res);
            result (null, res);
    })
  },

  module.exports = bibliotheques;
