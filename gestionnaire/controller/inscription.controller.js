const inscription = require('../model/inscription.model');
const mariadb = require('../config/db');

exports.creationUtilisateur = (req, res) => {

    const utilisateur={
         nom : req.body.nom,
         prenom : req.body.prenom,
         email : req.body.email,
         datenaissance : req.body.datenaissance,
         motdepasse : req.body.motdepasse,
        // nom : 'test',
        // prenom : 'test',
        // email : 'florian@test.be',
        // datenaissance : '1998-09-03',
        // motdepasse : '6BE7151&t',
    };

     inscription.creationUtilisateur(utilisateur, (err, data) => {
        if (err) {
              res.status(500).send({
                message: "Marche pas"
              });
            }
          else {
            res.header("Access-Control-Allow-Origin","*");
            res.send(data);
          }
      });
    };

    exports.supprimerUtilisateur = (req, res) => {
      inscription.supprimerUtilisateur(req.params.email, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Impossible de supprimer l'utilisateur ${req.params.email}.`,
            });
          } else {
            res.status(500).send({
              message: "Error",
            });
          }
        } else {
          res.header("Access-Control-Allow-Origin", "*");
          res.send(data);
        }
      });
    };