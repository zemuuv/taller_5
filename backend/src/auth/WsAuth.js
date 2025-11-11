// Simulación de la librería ClientWS
class ClientWS {
  validate(user, password) {
    return user === 'wsuser' && password === 'wspass';
  }
}

class WsAuth {
  async autenticar(usuario, clave) {
    const client = new ClientWS();
    return client.validate(usuario, clave)
      ? { ok: true, fuente: 'WS' }
      : { ok: false };
  }
}

module.exports = WsAuth;
