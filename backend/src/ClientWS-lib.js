class ClientWS {
  static validate(user, password) {
    // Simulación: wsuser / 1234 => válido
    return (user === 'wsuser' && password === '1234');
  }
}

module.exports = ClientWS;
