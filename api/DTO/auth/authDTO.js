// Registration
class RegistrationRequestDTO {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

class RegistrationResponseDTO {
  constructor(message) {
    this.message = message;
  }
}

// Login
class LoginRequestDTO {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }
}

class LoginResponseDTO {
  constructor(token, user) {
    this.token = token;
    this.user = user;
  }
}

module.exports = {
  RegistrationRequestDTO,
  RegistrationResponseDTO,
  LoginRequestDTO,
  LoginResponseDTO
}
