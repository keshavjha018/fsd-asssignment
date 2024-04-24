// Routes for project class

const express = require("express");
const Projects = require("./../controllers/project.controller");

const projectRouter = new express.Router();
const Project = new Projects();

projectRouter.post("/create", async (req, res) => { Project.createProject(req, res) });
projectRouter.delete("/delete/:id", async (req, res) => { Project.deleteProject(req, res) });
projectRouter.post("/get/all", async (req, res) => { Project.getAllProjects(req, res) });
projectRouter.get("/get/:id", async (req, res) => { Project.getProject(req, res) });

module.exports = projectRouter;