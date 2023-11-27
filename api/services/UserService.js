const userRepository = require("../repositories/UserRepository");

class UserService {
  async findByEmail(email) {
    return await userRepository.findByEmail(email);
  }
}

module.exports = new UserService();
