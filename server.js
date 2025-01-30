if(process.env.ENV !== "production"){
  require('dotenv').config()
}

const express = require("express");
const app = express();

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to CRUD application." });
});
// set port, listen for requests

require('./router/user.routes.js')(app)
require('./router/project.routes.js')(app)

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// Test for connecting with Mysql server or not?

const db = require("./model");

db.sequelize.sync({alter:true})
  .then(() => {
    console.log("Connected with db.");
  })
  .catch((err) => {
    console.log("Failed to Connected with db: " + err.message);
  });


  // To clean the database.

  // db.sequelize.sync({ force: true }).then(() => {
  //   console.log("Drop and re-sync db.");
  // });