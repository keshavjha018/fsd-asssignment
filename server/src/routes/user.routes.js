// Routes for user class

const express = require("express");
const Users = require("./../controllers/user.controller");

const userRouter = new express.Router();
const User = new Users();

userRouter.get("/get/:id", async (req, res) => { User.getUser(req, res) });

// Signup
userRouter.post("/register", async (req, res) => { User.signup(req, res) });

// Login 
authRouter.post("/login", async (req, res) => { Auth.UserLogin(req, res) });

// Google Login 
authRouter.post("/googlelogin", async (req, res) => { Auth.GoogleLogin(req, res) });

module.exports = userRouter;