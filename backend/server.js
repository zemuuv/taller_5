require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { registrarUsuario, loginUsuario } = require('./src/auth/XMLAuth');
const CompositeCargar = require('./src/carga/compositeCargar');

const app = express();
app.use(cors());
app.use(bodyParser.json());

/* --------------------
   Login único (XML)
   -------------------- */
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ ok: false, error: 'Faltan credenciales' });
  }

  try {
    const msgXml = await loginUsuario(username, password); // si ok retorna mensaje
    return res.json({ ok: true, mensaje: msgXml, fuente: 'XML' });
  } catch (err) {
    return res.status(401).json({ ok: false, error: 'Credenciales inválidas' });
  }
});

/* --------------------
   Registro (XML)
   -------------------- */
app.post('/api/register', async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ ok: false, error: 'Faltan datos para registro' });
  }

  try {
    const msg = await registrarUsuario(username, password, email);
    res.json({ ok: true, mensaje: msg });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message || 'Error al registrar' });
  }
});

/* --------------------
   Endpoint de carga
   -------------------- */
app.post('/api/cargar', async (req, res) => {
  try {
    const composite = new CompositeCargar();
    const resultado = await composite.ejecutar();
    res.json(resultado);
  } catch (err) {
    console.error('Error en /api/cargar:', err);
    res.status(500).json({ ok: false, error: 'Error interno en carga' });
  }
});

/* --------------------
   Levantar servidor
   -------------------- */
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Backend escuchando en http://localhost:${PORT}`);
});
