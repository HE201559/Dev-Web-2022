const sql = require("./db");
const bibliotheques = function () {
  this.id = bibliotheques.id
};

bibliotheques.findBibliotheques = (email, result) => {
  sql.query(`SELECT * from tb_UsersBiblio WHERE emailUser="${email}";`, (err, res) => {
    if (err) {
      console.log("error : ", err);
      result(null, err);
      return;
    }
    console.log("donnees :", res);
    result(null, res);
  })
},

  bibliotheques.findBiblioCollection = (biblioId, result) => {
    sql.query(`SELECT tb_Bibliotheque.biblioId, tb_Objets.idObjet,  tb_Objets.prix, tb_Objets.nom, tb_Objets.description, tb_Objets.dateAcquisition, tb_Objets.etat, tb_Objets.edition from tb_Bibliotheque JOIN tb_Objets on tb_Bibliotheque.idObjet = tb_Objets.idObjet
    WHERE tb_Bibliotheque.biblioId = "${biblioId}";`, (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(null, err);
        return;
      }
      console.log("donnees :", res);
      result(null, res);
    })
  },

  module.exports = bibliotheques;
