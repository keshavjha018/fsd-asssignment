//Controllers for Component class

const Components = require("./../../db/models/component.schema");

class Component {

  // get all component of a user
  async getAllComponents(req, res) {
    try {
      const { projectId } = req.body;

      const components = await Components.find({
        project: projectId
      });

      // Success
      res.status(201).json({
        success: true,
        message: "Successfully fetched All Components",
        body: components
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

  // add new component
  async createComponent(req, res) {
    try {
      const { _id, name, type, userId } = req.body;

      const component = await Components.create({
        _id,
        name,
        type,
        owner: userId
      });

      // Success
      res.status(201).json({
        success: true,
        message: "Successfully added Component",
        body: component
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

module.exports = Component;
