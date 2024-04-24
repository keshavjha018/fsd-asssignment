//Controllers for Component class

const Components = require("./../../db/models/component.schema");

class Component {

  // get all component of a user
  async getAllComponents(req, res) {
    try {
      const { projectId } = req.params;

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
  async saveAllComponents(req, res) {
    try {
      const { allComponents } = req.body;

      // TODO: Another better approach can be implemented
      // To Update only those component which has been edited.
      allComponents?.map(async(comp) => {
        // Check if component already exists
        const myComp = await Components.findById(comp._id);
        
        if (!myComp) {
          // If no component found => Create New
          await Components.create(comp);
        }
        else {
          // Update
          myComp.set(comp);
          await myComp.save();
        }
      })

      // Success
      res.status(201).json({
        success: true,
        message: "Successfully added all Components"
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

  // delete component
  async deleteComponents(req, res) {
    try {
      const { componentId } = req.params;
      console.log(componentId);

      const data = await Components.findByIdAndDelete(componentId);

      // Success
      res.status(201).json({
        success: true,
        message: "Successfully deleted"
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
