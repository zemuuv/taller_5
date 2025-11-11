const { sql, config } = require('../dbConfig');

module.exports = {
  autenticar: async (usuario, clave) => {
    try {
      let pool = await sql.connect(config);
      const result = await pool.request()
        .input('usuario', sql.VarChar(100), usuario)
        .input('clave', sql.VarChar(100), clave)
        .query('SELECT * FROM Usuarios WHERE usuario=@usuario AND clave=@clave');

      return result.recordset.length > 0 ? { ok:true, fuente:'BD' } : { ok:false, fuente:'BD' };
    } catch (err) {
      return { ok:false, error: err.message };
    }
  }
};
