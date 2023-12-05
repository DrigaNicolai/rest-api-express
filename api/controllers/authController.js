const authService = require("../services/AuthService");
const userService = require("../services/UserService");
const bcrypt = require('bcryptjs');
const { generateAccessToken } = require("../../utils/token");
const {
  RegistrationRequestDTO,
  RegistrationResponseDTO,
  LoginRequestDTO,
  LoginResponseDTO
} = require("../DTO/auth/authDTO");

class AuthContoller {
  async register(req, res) {
    try {
      const registrationRequest = new RegistrationRequestDTO(
        req.body.name,
        req.body.email,
        req.body.password,
      );
      const user = await userService.findByEmail(registrationRequest.email);

      if (user) {
        res.status(422).json({message: `User with this email already exists`});
        
        return;
      }

      const response = await authService.register(registrationRequest);

      res.status(201).json(new RegistrationResponseDTO(response.message));
    } catch (e) {
      res.status(400).json({message: `Registration error: ${JSON.stringify(e)}`});
    }
  }

  async login(req, res) {
    try {
      const loginRequest = new LoginRequestDTO(req.body.email, req.body.password);
      const { email, password } = loginRequest;
      const user = await userService.findByEmail(loginRequest.email);

/*       if (!user) {
        res.status(404).json({message: `User with email ${email} was not found`});
      } */

      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword || !user) {
        return res.status(401).json({message: `User authentication failed`});
      }

      const token = generateAccessToken(user.id, user.role_name, user.email);
      const response = { 
        token, 
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role_name
        } 
      };

      res.status(200).json(new LoginResponseDTO(response.token, response.user));
    } catch (e) {
      res.status(400).json({ message: `Login error: ${JSON.stringify(e)}`});
    }
  }
}

module.exports = new AuthContoller();
