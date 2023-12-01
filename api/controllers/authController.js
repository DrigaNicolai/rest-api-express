const authService = require("../services/AuthService");
const userService = require("../services/UserService");
const bcrypt = require('bcryptjs');
const { generateAccessToken } = require("../../utils/token");

class AuthContoller {
  async register(req, res) {
    try {
      res.status(201).json(await authService.register(req.body));
    } catch (e) {
      res.status(400).json({message: `Registration error: ${JSON.stringify(e)}`});
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await userService.findByEmail(email);

/*       if (!user) {
        res.status(404).json({message: `User with email ${email} was not found`});
      } */

      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword || !user) {
        return res.status(401).json({message: `User authentication failed`});
      }

      const token = generateAccessToken(user.id, user.role_name, user.email);

      res.status(200).json(
        { 
          token, 
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role_name
          } 
        }
      );
    } catch (e) {
      res.status(400).json({ message: `Login error: ${JSON.stringify(e)}`});
    }
  }
}

module.exports = new AuthContoller();
