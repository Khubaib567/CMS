if(process.env.ENV !== "production"){
  require('dotenv').config({path : './.secrets/.env'})
}

const express = require("express");
const app = express();
const {limiter} = require("./utils/limiter");

// PARSE REQUESTS OF CONTENT-TYPE - APPLICATION/JSON
app.use(express.json());

// PARSE REQUESTS OF CONTENT-TYPE - APPLICATION/X-WWW-FORM-URLENCODED
app.use(express.urlencoded({ extended: true }));

// APPLY RATE-LIMIT AS MIDDLEWARE
app.use(limiter)

// SIMPLE ROUTE
app.get("/", (req, res) => {
  res.json({ message: "Welcome to CRUD application." });
});

// SET PORT, LISTEN FOR REQUESTS
require('./router/user.routes.js')(app)
require('./router/project.routes.js')(app)

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// TEST FOR CONNECTING WITH MYSQL SERVER OR NOT?

const db = require("./config/db.config.js");

db.sequelize.sync({alter:true})
  .then(() => {
    console.log("Connected with database.");
  })
  .catch((err) => {
    console.log("Failed to Connected with database: " + err);
  });


// TO CLEAN THE DATABASE.

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });