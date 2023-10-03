const authService = require("../services/AuthService");
const { validationResult } = require('express-validator');

class AuthContoller {
  async register(req, res) {
    try {
      /* const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({message: "Error while registering", errors});
      } */

      res.status(201).json(await authService.register(req.body));
    } catch (e) {
      res.status(422).json({message: 'Registration error'})
    }
  }
}

module.exports = new AuthContoller();
