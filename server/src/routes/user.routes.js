// Routes for user class

const express = require("express");
const Users = require("./../controllers/user.controller");

const userRouter = new express.Router();
const User = new Users();

userRouter.get("/get/:id", async (req, res) => { User.getUser(req, res) });

// Signup
userRouter.post("/register", async (req, res) => { User.signup(req, res) });

// Login 
userRouter.post("/login", async (req, res) => { User.login(req, res) });

// Google Login 
userRouter.post("/googlelogin", async (req, res) => { User.GoogleLogin(req, res) });

userRouter.post("/update", async (req, res) => { User.updateUser(req, res) });

module.exports = userRouter;