const authRepository = require("../repositories/AuthRepository");
const bcrypt = require('bcryptjs');

class AuthService {
  async register(item) {
    try {
      const { password } = item;

      const hashPassword = bcrypt.hashSync(password, 7);
  
      return await authRepository.register({ ...item, password: hashPassword });
    } catch (e) {
      console.error(e);
      throw new Error(`AuthService Error: ${e.message}`);
    }
  }
};

module.exports = new AuthService();
