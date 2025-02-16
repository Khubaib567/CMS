const db = require("../config/db.config");
const {generateToken,removeToken} = require('../utils/jsonToken');
const User = db.users;
const Project = db.projects;
const Op = db.Sequelize.Op;

// CREATE AND SAVE A NEW USER
exports.create = async (req, res) => {
  try {
    if (!req.body.user_name) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    // CREATE A USER OBJECT
    const obj = {
      user_name: req.body.user_name,
      user_password: req.body.user_password,
      user_email: req.body.user_email,
      updated: req.body.updated ? req.body.updated : false,
    };

    // SAVE USER IN THE DATABASE
    const data = await User.create(obj);

    // FETCH THE NEWLY CREATED USER USING FINDONE
    const user = await User.findOne({ where: { id: data.id } });
    if (!user) {
       return res.status(404).json({ message: "User not found after creation" });
    }

    // GENERATE TOKEN 
    const token = await generateToken(res, user.id);
    // UPDATE THE USER WITH INSERT THE TOKEN
    const user_with_jwt = await user.update({ token });
    res.send({ user_with_jwt });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the User."
    });
  }
};

// RETRIEVE ALL USERS FROM THE DATABASE.
exports.findAll = async (req, res) => {
  try {
    const data = await User.findAll({ include: ["projects"] });
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving Users."
    });
  }
  
};

// FIND A SINGLE USER WITH AN ID
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findByPk(id, { include: ["projects"] });

    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Cannot find User with id=${id}.`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving User with id=" + id
    });
  }
  
};
// UPDATE A USER BY THE ID IN THE REQUEST
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const [num] = await User.update(req.body, { where: { id: id } });

    if (num === 1) {
      res.send({ message: "User was updated successfully." });
    } else {
      res.send({
        message: `Cannot update User with id=${id}. Maybe user was not found or req.body is empty!`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating user with id=" + id
    });
  }
  
};
// DELETE A USER WITH THE SPECIFIED ID IN THE REQUEST
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const num = await User.destroy({ where: { id: id } });

    removeToken(req, res);

    if (num === 1) {
      res.send({ message: "User was deleted successfully!" });
    } else {
      res.send({
        message: `Cannot delete user with id=${id}. Maybe User was not found!`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete user with id=" + id
    });
  }
 
};
// DELETE ALL USERS FROM THE DATABASE.
exports.deleteAll = async (req, res) => {
  try {
    const nums = await User.destroy({ where: {}, truncate: false });
    res.send({ message: `${nums} Users were deleted successfully!` });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while removing all Users."
    });
  }
  
};
// FIND ALL PUBLISHED USERS
exports.findAllUpdated = async (req, res) => {
  try {
    const data = await User.findAll({ where: { updated: true } });
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving Users."
    });
  }
};

