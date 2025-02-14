if(process.env.NODE !=="production"){
  require('dotenv').config()
}
const Sequelize = require("sequelize");

const database = process.env.DATABASE;
const user_name = process.env.USER_NAME;
const password = process.env.PASSWORD;
const sequelize = new Sequelize(database, user_name, password, {
  host: 'localhost',
  dialect: 'mysql' 

});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("../model/user.model.js")(sequelize, Sequelize);
db.projects = require('../model/project.model.js')(sequelize, Sequelize);

db.users.hasMany(db.projects,{onDelete: 'CASCADE',onUpdate:'CASCADE'});
db.projects.belongsTo(db.users,{onDelete: 'CASCADE',onUpdate:'CASCADE'});

module.exports = db;

