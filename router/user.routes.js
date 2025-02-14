module.exports = app => {
    const users = require("../controller/user.controller.js");
    const {auth} = require("../utils/auth-config.js")

    var router = require("express").Router();
    // Create a new User
    router.post("/", users.create);
    // Retrieve all users
    router.get("/", auth() , users.findAll);
    // Retrieve all published users
    router.get("/updated", auth() , users.findAllUpdated);
    // Retrieve a single User with id
    router.get("/:id", auth() , users.findOne);
    // Update a User with id
    router.put("/:id", auth() , users.update);
    // Delete a User with id
    router.delete("/:id", auth() , users.delete);
    // Delete all users
    router.delete("/", auth() , users.deleteAll);
    app.use('/api/user', router);
};