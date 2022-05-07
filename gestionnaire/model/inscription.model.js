const mysql = require('../model/db');
const inscription = function () {

} 


inscription.creationUtilisateur=(utilisateur, result) => {
    let bcrypt = require('bcryptjs');
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(utilisateur.motdepasse, salt, function(err, hash) {
            var requete = "INSERT INTO tb_Users (nom,prenom,email,datenaissance,motdepasse) VALUES ? ";
            var values = [[utilisateur.nom, utilisateur.prenom, utilisateur.email, utilisateur.datenaissance, hash]];
            mysql.query(requete, [values],
                (err, res) => {
                    if (err) {
                        console.log("error : ", err);
                result(null, err);
                return;
                }
                console.log("Marche");
                result(null, res);
            });
        });
    });
};

inscription.supprimerUtilisateur = (email, result) => {
    mysql.query(`DELETE from tb_Users where email="${email}";`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("contacts :", res);
      result(null, res);
    });
  
  };
  


module.exports = inscription;