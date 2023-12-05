const userRepository = require("../repositories/UserRepository");

class UserService {
  async findByEmail(email) {
    try {
      return await userRepository.findByEmail(email);
    } catch (e) {
      console.error(e);
      throw new Error(`UserService Error: ${e.message}`);
    }
  }
}

module.exports = new UserService();
