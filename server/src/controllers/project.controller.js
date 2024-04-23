//Controllers for Project class

const Projects = require("./../../db/models/project.schema");

class Project {

  // Get by project ID
  async getProject(req, res) {
    try {
      const { id } = req.params;
      const data = await Projects.findById(id);

      // Success
      res.status(201).json({
        success: true,
        message: "Successfully fetched Project details",
        body: data
      });
    }
    catch (error) {
      res.status(404).json({
        success: false,
        message: "Cant fetch details"
      })
      console.log(error);
    }
  }

  async deleteProject(req, res) {
    try {
      const { id } = req.params;
      console.log(id);

      await Projects.findByIdAndDelete(id);

      // Success
      res.status(201).json({
        success: true,
        message: "Successfully Deleted the Project"
      });
    }
    catch (error) {
      res.status(404).json({
        success: false,
        message: "Can't Delete Project"
      })
      console.log(error);
    }
  }

  // get all project of a user
  async getAllProjects(req, res) {
    try {
      const { userId } = req.body;

      const projects = await Projects.find({
        owner: userId
      });

      // Success
      res.status(201).json({
        success: true,
        message: "Successfully fetched All Projects",
        body: projects
      });
    } catch(error) {
      res.status(404).json({
        success: false,
        message: "Some Error Occured"
      })
      console.log(error);
    }
  }

  // add new project
  async createProject(req, res) {
    try {
      const { name, userId } = req.body;
      console.log(req.body);

      const project = await Projects.create({
        name,
        owner: userId
      });

      // Success
      res.status(201).json({
        success: true,
        message: "Successfully added Project",
        body: project
      });
    }
    
    catch(error) {
      res.status(404).json({
        success: false,
        message: "Some Error Occured"
      })
      console.log(error);
    }
  }

}

module.exports = Project;
