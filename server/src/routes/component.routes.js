// Routes for component class

const express = require("express");
const Components = require("./../controllers/component.controller");

const componentRouter = new express.Router();
const Component = new Components();

componentRouter.post("/save", async (req, res) => { Component.saveAllComponents(req, res) });
componentRouter.get("/getall/:projectId", async (req, res) => { Component.getAllComponents(req, res) });

module.exports = componentRouter;