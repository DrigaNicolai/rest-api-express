const authRepository = require("../repositories/AuthRepository");
const bcrypt = require('bcryptjs');

class AuthService {
  async register(item) {
    const { password } = item;

    const hashPassword = bcrypt.hashSync(password, 7);

    return await authRepository.register({ ...item, password: hashPassword });
  }
};

module.exports = new AuthService();
