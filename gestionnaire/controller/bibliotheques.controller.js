const bibliotheques = require("../model/bibliotheques.model")


exports.findBibliotheques = (req, res) => {
      bibliotheques.findBibliotheques(req.params.email, (err, data) => {
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

