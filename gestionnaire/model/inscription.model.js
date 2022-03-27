const mysql = require('../model/db');
const inscription = function () {

} 


inscription.creationUtilisateur=(utilisateur, result) => {
            var requete = "INSERT INTO tb_Users (nom,prenom,email,datenaissance,motdepasse) VALUES ? ";
            var values = [[utilisateur.nom, utilisateur.prenom, utilisateur.email, utilisateur.datenaissance, utilisateur.motdepasse]];
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
    };


module.exports = inscription;