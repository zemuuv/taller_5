const ClientWS = require('../ClientWS-lib');

module.exports = {
  autenticar: async (usuario, clave) => {
    try {
      const valid = ClientWS.validate(usuario, clave);
      return valid ? { ok:true, fuente:'WS' } : { ok:false, fuente:'WS' };
    } catch (err) {
      return { ok:false, error: err.message };
    }
  }
};
