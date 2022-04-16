var bodyParser = require('body-parser')


// create application/json parser
var jsonParser = bodyParser.json()

module.exports =(app) => {
    
    const inscription= require("../controller/inscription.controller")
    const connexion = require("../controller/connexion.controller")


    app.post("/inscription",jsonParser, inscription.creationUtilisateur);
    app.get("/connexion/:email", connexion.findUtilisateur)
    app.get("/findTousUtilisateurs", connexion.findTousUtilisateurs)
}