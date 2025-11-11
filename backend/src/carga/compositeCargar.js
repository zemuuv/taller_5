const LeerCSV = require('../carga/LeerCSV');
const GuardarBD = require('../carga/GuardarDB');
const EnviarCorreo = require('../carga/EnviarCorreo');

class CompositeCargar {
  constructor() {
    this.leerCSV = new LeerCSV();
    this.guardarBD = new GuardarBD();
    this.enviarCorreo = new EnviarCorreo();
  }

  // Único método que el cliente invoca
  async ejecutar() {
    try {
      const datos = await this.leerCSV.ejecutar();
      const resultadoGuardar = await this.guardarBD.ejecutar(datos);

      let mensaje = '';
      if (resultadoGuardar.ok) {
        mensaje = `Carga exitosa. ${resultadoGuardar.mensaje}`;
      } else {
        mensaje = `Error al guardar: ${resultadoGuardar.error}`;
      }

      const resultadoCorreo = await this.enviarCorreo.ejecutar(mensaje);

      return {
        ok: true,
        detalle: {
          lectura: { registros: datos.length },
          guardar: resultadoGuardar,
          correo: resultadoCorreo
        }
      };
    } catch (err) {
      return { ok:false, error: err.message };
    }
  }
}

module.exports = CompositeCargar;
