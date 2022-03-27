async handleSubmit(event) {
        
  // Test que tous les champs sont remplis
    if(this.state.nom === '' || this.state.prenom === '' || this.state.email === '' || this.state.motdepasse === '' || this.state.confirmmotdepasse === ''){
        alert("Complétez tous les champs avant l'inscription")
    }
   // Test qu'une email a la bonne syntaxe
    /*else if( this.state.email.length < 8 || this.state.email.includes('.') === false || this.state.email.includes('@') === false) {
        alert("Inserez une email correcte");
    }*/


    else if(this.state.password !== this.state.confirmPassword){
            alert("Les mots de passes ne correspondent pas");
    }
   //A rajouter après que ça fonctionne et voir ce qu'on met en password policy
    /*else if(this.state.password.length <8 || this.state.password.match(/\d+/) == null || this.state.password === this.state.password.toLowerCase()){
       alert("Mot de passe pas assez complique")
    }*/

    else{ 

    event.preventDefault();
    await fetch('http://localhost:5000/inscription',{
         
          method:'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin":"true"
          },
          body: JSON.stringify({
            nom:this.state.nom,
            prenom:this.state.prenom,
            email:this.state.email,      
            datenaissance:this.state.datenaissance,
            motdepasse:this.state.motdepasse,
          }),
          
          
        })
        .then(res => res.text())
        .then(text => console.log(text))
        .then(response => response.json())
        .then(json => {
    
            
          }).catch((error) => {
            console.log(error)
            
            alert("Echec de l'inscription");   
      });

    
    };
} 