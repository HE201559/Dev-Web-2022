var bodyParser = require('body-parser')


// create application/json parser
var jsonParser = bodyParser.json()

module.exports = (app) => {

    const inscription = require("../controller/inscription.controller")
    const connexion = require("../controller/connexion.controller")
    const bibliotheques = require("../controller/bibliotheques.controller")


    app.post("/inscription", jsonParser, inscription.creationUtilisateur);
    app.post("/ajoutObjetTbBiblio", jsonParser, bibliotheques.creationObjetTbBiblio);
    app.post("/ajoutObjetTbObjets", jsonParser, bibliotheques.creationObjetTbObjets);
    app.post("/ajoutBibliotheque", jsonParser, bibliotheques.creationBibliotheque);


    app.get("/connexion/:email", connexion.findUtilisateur)
    app.get("/findTousUtilisateurs", connexion.findTousUtilisateurs)
    app.get("/findBibliotheques/:email", bibliotheques.findBibliotheques)
    app.get("/findBibliothequesDateCrea/:biblioId", bibliotheques.findBibliothequesDateCrea)
    app.get("/findBiblioCollection/:biblioId", bibliotheques.findBiblioCollection)
    app.get("/findAllBiblioCollection", bibliotheques.findAllBiblioCollection)
    app.get("/findCollectionInfos/:biblioId", jsonParser, bibliotheques.findCollectionInfos)

}