const { sql, config } = require('../dbConfig');

class GuardarBD {
  async ejecutar(datos) {
    if (!Array.isArray(datos)) return { ok:false, error:'Datos deben ser arreglo' };
    try {
      let pool = await sql.connect(config);
      for (const d of datos) {
        await pool.request()
          .input('campo1', sql.VarChar(200), d.campo1 || null)
          .input('campo2', sql.VarChar(200), d.campo2 || null)
          .query('INSERT INTO Datos (campo1, campo2) VALUES (@campo1, @campo2)');
      }
      return { ok:true, mensaje:`Insertados ${datos.length} registros` };
    } catch (err) {
      return { ok:false, error: err.message };
    }
  }
}

module.exports = GuardarBD;
