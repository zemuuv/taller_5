const nodemailer = require('nodemailer');
require('dotenv').config();

class EnviarCorreo {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    });
    this.destino = process.env.EMAIL_DESTINO;
  }

  async ejecutar(texto) {
    try {
      const info = await this.transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: this.destino,
        subject: 'Resultado de la carga de datos',
        text: texto
      });
      return { ok:true, mensaje:'Correo enviado', info };
    } catch (err) {
      return { ok:false, error: err.message };
    }
  }
}

module.exports = EnviarCorreo;

