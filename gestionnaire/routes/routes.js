

module.exports =(app) => {
    
    const inscription= require("../controller/inscription.controller")

    app.post("/inscription", inscription.creationUtilisateur);
}