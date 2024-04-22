//Controllers for User class

const Users = require("./../../db/models/user.schema");
var { v4: uuidv4 } = require("uuid");
var bcrypt = require("bcryptjs");

class User {

  async getUser(req, res) {
    try {
      const { id } = req.params;
      const data = await Users.findById(id);

      // Success
      res.status(201).json({
        success: true,
        message: "Successfully fetched User details",
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

  // Create new user
  async create(req, res) {
    
  }

}

module.exports = User;
