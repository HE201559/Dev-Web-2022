const http = require('http');
const hostname = '127.0.0.1';
const port = 5000;
const app = require('express') ();
require("./model/creation.model");
const routes = require("./routes/routes")

app.listen(
  port,
  () => console.log("it's alive on http://localhost:" + port)
)
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Test node js');
});

app.use('/', routes);
// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });