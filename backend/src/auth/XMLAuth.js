const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");

const xmlFile = path.join(__dirname, "../../data/usuarios.xml");

// Leer usuarios desde XML
async function leerUsuarios() {
  const data = fs.readFileSync(xmlFile, "utf-8");
  const result = await xml2js.parseStringPromise(data);
  return result.usuarios.usuario || [];
}

// Guardar usuarios en XML
async function guardarUsuarios(usuarios) {
  const builder = new xml2js.Builder();
  const xml = builder.buildObject({ usuarios: { usuario: usuarios } });
  fs.writeFileSync(xmlFile, xml, "utf-8");
}

// Registrar nuevo usuario
async function registrarUsuario(username, password, email) {
  let usuarios = await leerUsuarios();

  // Verificar si ya existe
  const existe = usuarios.find(u => u.username[0] === username);
  if (existe) throw new Error("⚠️ Usuario ya existe");

  usuarios.push({
    username: [username],
    password: [password],
    email: [email],
  });

  await guardarUsuarios(usuarios);
  return "✅ Usuario registrado";
}

// Autenticar usuario
async function loginUsuario(username, password) {
  let usuarios = await leerUsuarios();
  const user = usuarios.find(
    u => u.username[0] === username && u.password[0] === password
  );

  if (!user) throw new Error("❌ Credenciales inválidas");
  return `✅ Bienvenido ${username}`;
}

module.exports = { registrarUsuario, loginUsuario };
