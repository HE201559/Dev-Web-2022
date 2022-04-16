const connexion = require("../model/connexion.model")


exports.findUtilisateur = (req, res) => {
      connexion.findUtilisateur(req.params.email, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
            });
          } else {
            res.status(500).send({
              
            });
          }
        } else {
          res.header("Access-Control-Allow-Origin", "*");
          res.send(data);
        }
      });

    }


exports.findTousUtilisateurs = (req, res) => {
      connexion.findTousUtilisateurs((err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
            });
          } else {
            res.status(500).send({
              
            });
          }
        } else {
          res.header("Access-Control-Allow-Origin", "*");
          res.send(data);
        }
      });
    }
  
