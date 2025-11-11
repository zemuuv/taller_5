const XMLAuth = require('../auth/XMLAuth');
const DBAuth = require('../auth/DButh');
const WSAuth = require('../auth/WsAuth');

/*
Facade: Exponer siempre autenticar(usuario, clave) para el cliente.
Regla de selección: puedes cambiarla a config o lookup. Ahora usamos prefijo.
*/
class FacadeAuth {
  async autenticar(usuario, clave) {
    if (!usuario) return { ok:false, error:'Usuario vacío' };

    if (usuario.startsWith('xml')) {
      return await XMLAuth.autenticar(usuario, clave);
    } else if (usuario.startsWith('db')) {
      return await DBAuth.autenticar(usuario, clave);
    } else {
      return await WSAuth.autenticar(usuario, clave);
    }
  }
}

module.exports = new FacadeAuth();
