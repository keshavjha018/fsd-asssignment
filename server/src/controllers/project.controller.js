//Controllers for Project class

const Projects = require("./../../db/models/project.schema");

class Project {

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

}

module.exports = Project;
