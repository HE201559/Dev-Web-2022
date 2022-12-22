const http = require('http');
const hostname = 'localhost';
const port = 5000;
const cors = require('cors');
const bcrypt = require('bcryptjs');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require("./routes/routes")(app);

app.use(bodyParser.json())


app.use(express.json());
app.use(cors({
  
}));

app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", '*');
  response.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  response.header("Access-Control-Allow-Methods", "GET,HEAD,POST,PUT,DELETE,OPTIONS");
  response.header("Access-Control-Allow-Credentials", "true");
  next();
});

/*const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host:'137.74.198.28',
  user:'remote',
  password:'Welcom@2803',
  database:'gestionnaire_collection'
})
*/


/*
async function main(){
  try{
    let conn= await pool.getConnection();
    let rows= await conn.query("INSERT INTO tb_Users (nom,prenom,email,datenaissance,motdepasse) VALUES ('boulanger-flemal', 'jarod', 'jarod@bbbbqz.com', '1999-09-17', 'password')");
    console.log('data insert');
  }
  catch(err){
    console.log(err);
  }
}

main();
*/
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
