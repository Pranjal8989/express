// Express is a minimal and flexible Node.js web application framework that provides a robust set of features to develop web and mobile applications
const express = require("express");
const db = require('../src/config/database');
const app = express(); // Intialise the express
const port = 3000;

const routes = require("./routes/v1");
app.use(express.json()); 
app.listen(port, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + port
    );
  else console.log("Error occurred, server can't start", error);
});

// v1 api routes
app.use("/v1", routes);
