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

exports.findAllBiblioCollection = (req, res) => {
  bibliotheques.findAllBiblioCollection((err, data) => {
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

exports.findBiblioCollection = (req, res) => {
  bibliotheques.findBiblioCollection(req.params.biblioId, (err, data) => {
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

exports.creationBibliotheque = (req, res) => {

  const bibliotheque = {
    emailUser: req.body.emailUser,
    nomBibli: req.body.nomBibli,
    biblioDateCre: req.body.biblioDateCre,
  };

  bibliotheques.creationBibliotheque(bibliotheque, (err, data) => {
    if (err) {
      res.status(500).send({
        message: "Marche pas"
      });
    }
    else {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(data);
    }
  });
};

exports.creationObjetTbBiblio = (req, res) => {

  const objet = {
    /*nom : req.body.nom,
    description : req.body.description,
    prix : req.body.prix,
    dateAcquisition : req.body.dateAcquisition,
    etat : req.body.etat,
    edition: req.body.edition,*/
    biblioId: req.body.biblioId,
    //objetId: req.body.objetId
  };

  bibliotheques.creationObjetTbBiblio(objet, (err, data) => {
    if (err) {
      res.status(500).send({
        message: "Marche pas"
      });
    }
    else {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(data);
    }
  });
};

exports.creationObjetTbObjets = (req, res) => {

  const objet = {
    nom: req.body.nom,
    description: req.body.description,
    prix: req.body.prix,
    dateAcquisition: req.body.dateAcquisition,
    etat: req.body.etat,
    edition: req.body.edition,
    //biblioId: req.body.biblioId,
    objetId: req.body.objetId
  };

  bibliotheques.creationObjetTbObjets(objet, (err, data) => {
    if (err) {
      res.status(500).send({
        message: "Marche pas"
      });
    }
    else {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(data);
    }
  });
};


exports.findCollectionInfos = (req, res) => {
  bibliotheques.findCollectionInfos(req.params.biblioId, (err, data) => {
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

