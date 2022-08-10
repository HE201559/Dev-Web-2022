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
    app.post("/vendreObjet/:idObjet", jsonParser, bibliotheques.vendreObjet);
    app.post("/ajoutModele/:idObjet", jsonParser, bibliotheques.ajoutModele);
    app.post("/ajoutTemplate", jsonParser, bibliotheques.ajoutTemplate);




    app.get("/connexion/:email", connexion.findUtilisateur)
    app.get("/findTousUtilisateurs", connexion.findTousUtilisateurs)
    app.get("/findAllBibliotheques", bibliotheques.findAllBibliotheques)
    app.get("/findBibliotheques/:email", bibliotheques.findBibliotheques)
    app.get("/findBibliothequesDateCrea/:biblioId", bibliotheques.findBibliothequesDateCrea)
    app.get("/findBiblioCollectionPossedee/:biblioId", bibliotheques.findBiblioCollectionPossedee)
    app.get("/findBiblioCollectionVendu/:biblioId", bibliotheques.findBiblioCollectionVendu)
    app.get("/findAllObjets", bibliotheques.findAllObjets)
    app.get("/findAllBiblioCollection", bibliotheques.findAllBiblioCollection)
    app.get("/findCollectionInfos/:biblioId", jsonParser, bibliotheques.findCollectionInfos)
    app.get("/findBenefices/:biblioId", bibliotheques.findBenefices)
    app.get("/findChampsPersos", bibliotheques.findChampsPersos)
    //app.get("/findTemplateId/:donnees", bibliotheques.findTemplateId)


    app.delete("/supprimerObjet/:idObjet", bibliotheques.supprimerObjet);
    app.delete("/supprimerBiblio/:idBiblio", bibliotheques.supprimerBiblio);
    app.delete("/supprimerUtilisateur/:email", inscription.supprimerUtilisateur);

}