const fs = require('fs');
const csv = require('csv-parser');

class LeerCSV {
  constructor(ruta = './datos.csv') {
    this.ruta = ruta;
  }
  ejecutar() {
    return new Promise((resolve, reject) => {
      const resultados = [];
      fs.createReadStream(this.ruta)
        .pipe(csv())
        .on('data', (data) => resultados.push(data))
        .on('end', () => resolve(resultados))
        .on('error', (err) => reject(err));
    });
  }
}

module.exports = LeerCSV;
