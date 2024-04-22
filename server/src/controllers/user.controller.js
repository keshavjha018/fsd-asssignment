//Controllers for User class

const Users = require("./../../db/models/user.schema");
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

  async GoogleLogin(req, res) {
    const {email, photoURL} = req.body;

    try {
      let user = await Users.findOne({ email });
      
      // Case: User DNE => Create New
      if (!user) {
        const userData = await Users.create({
          email: email,
          OAuth: true,
          photoURL: photoURL
        });

        // Sending the Success response
        res.status(200).json({
          success: true,
          message: "Sign Up Successful",
          userData
        });
      }

      // Case: User Already Exists
      else {
        // Case: User is Verified via OAuth
        if(user.OAuth === true) {

          // Success
          res.status(200).json({
            success: true,
            message: "Login Successful",
            user
          });
        }

        // Case: User is NOT Verified via OAuth
        else {
          const res = await user.updateOne({
            OAuth: true,
            isVerified: true,
            photoURL: photoURL
          })

          user.OAuth = true;

          // Success
          res.status(200).json({
            success: true,
            message: "Login Successful",
            userData
          });
        }
      }

    } catch(err) {
      console.log(err);
    }
  }

  // Create new user
  async signup(req, res) {
    let { email, password } = req.body;

    try {
      // Check if User already Exists
      const user = await Users.findOne({ email });

      //  If user is registered
      if (user) {
        return res.status(200).json({
          success: false, 
          message: "User Already Exists !" 
        });
      }

      // Hashing the Password
      password = await bcrypt.hash(password, 10);

      // Create a new User
      const newUser = await Users.create({
        email: email,
        password: password
      });

      // Sending the Success response
      res.status(201).json({
        success: true,
        message: "Signup Success !",
        body: newUser
      });

    }
    catch (error) {
      console.log(error);
      res.status(500).json({message: "Server Error"});
    }
  }

  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await Users.findOne({ email: email });

      // User doesn't Exist
      if (!user) return res.status(200).json({ success: false, message: "User Not Registered" });
      
      if (!user.password && user.OAuth == true) {
        return res.status(200).json({
          success: false,
          message: "You have signed up via Google, Use Google-SignIn for signing in"
        })
      }

      // Checking Password
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch === false) return res.status(200).json({ success: false, message: "Incorrect Credential" });


      //NOW PROCEED
      console.log("Login Success");

      res.status(200).json({
        userId: user._id, name: user.name, email: user.email,
        message: "Login Successful", success: true
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  }

}

module.exports = User;
