// Routes for user class

const express = require("express");
const Users = require("./../controllers/user.controller");

const userRouter = new express.Router();
const User = new Users();

userRouter.get("/get/:id", async (req, res) => { User.getUser(req, res) });          // get user details
userRouter.post("/register", async (req, res) => { User.create(req, res) });           // Register new user 

module.exports = userRouter;