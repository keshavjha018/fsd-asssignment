// Routes for component class

const express = require("express");
const Components = require("./../controllers/component.controller");

const componentRouter = new express.Router();
const Component = new Components();

componentRouter.post("/create", async (req, res) => { Component.createComponent(req, res) });
componentRouter.post("/get/all", async (req, res) => { Component.getAllComponents(req, res) });

module.exports = componentRouter;