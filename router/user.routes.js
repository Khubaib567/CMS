module.exports = app => {
    const users = require("../controller/user.controller.js");
    // APPLY AUTHENTICATION AS MIDDLEWARE
    const {auth} = require("../utils/auth-config.js")
    // APPLY AUTHORIZATION AS MIDDLEWARE
    const {authRole} = require("../utils/auth-config.js")

    var router = require("express").Router();
    // CREATE A NEW USER
    router.post("/", users.create);
    // RETRIEVE ALL USERS
    router.get("/", auth() , authRole() , users.findAll);
    // RETRIEVE ALL PUBLISHED USERS
    router.get("/updated", auth() , authRole() , users.findAllUpdated);
    // RETRIEVE A SINGLE USER WITH ID
    router.get("/:id", auth() , authRole() , users.findOne);
    // UPDATE A USER WITH ID
    router.put("/:id", auth() , authRole() , users.update);
    // DELETE A USER WITH ID
    router.delete("/:id", auth() , authRole() , users.delete);
    // DELETE ALL users
    router.delete("/", auth() , authRole() , users.deleteAll);
    app.use('/api/user', router);
};