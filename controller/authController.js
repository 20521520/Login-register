const bcrypt = require("bcrypt");
const User = require("../model/User");


const authController = {

    registerUser: async(req,res) => {
        try {
            //hashed pass
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);
            
            //create user
            const newUser = await new User({
                username: req.body.username,
                email: req.body.email,
                password: hashed,   
            })            

            //save to DB
            const user = await newUser.save();
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}


loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        res.status(404).json("Incorrect username");
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        res.status(404).json("Incorrect password");
      }
      if (user && validPassword) {
        res.status(200).json(user);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
module.exports = authController;