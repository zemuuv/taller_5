import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login({ onSuccess }) {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Autenticando...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const resp = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: usuario, password: clave }),
      });
      const data = await resp.json();
      Swal.close();

      if (resp.ok && data.ok) {
        await Swal.fire({
          icon: "success",
          title: "Bienvenido",
          text: data.mensaje || "Login correcto",
          timer: 1500,
          showConfirmButton: false,
        });
        onSuccess(usuario);
        navigate("/dashboard");
      } else {
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: data.error || data.mensaje || "Credenciales inválidas",
        });
      }
    } catch (err) {
      Swal.close();
      await Swal.fire({
        icon: "error",
        title: "Error conexión",
        text: err.message,
      });
    }
  };

  const handleRegister = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Registro",
      background: "#1e1e1e",
      color: "#fff",
      html: `
        <input id="swal-username" class="swal2-input" placeholder="Usuario">
        <input id="swal-email" class="swal2-input" placeholder="Correo">
        <input id="swal-password" type="password" class="swal2-input" placeholder="Contraseña">
      `,
      focusConfirm: false,
      preConfirm: () => {
        const username = document.getElementById("swal-username").value;
        const email = document.getElementById("swal-email").value;
        const password = document.getElementById("swal-password").value;
        if (!username || !email || !password) {
          Swal.showValidationMessage("Por favor completa todos los campos");
          return null;
        }
        return { username, email, password };
      },
    });

    if (formValues) {
      Swal.fire({
        title: "Registrando...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });
      try {
        const resp = await fetch("http://localhost:4000/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formValues.username,
            password: formValues.password,
            email: formValues.email,
          }),
        });
        const data = await resp.json();
        Swal.close();
        if (resp.ok && data.ok) {
          await Swal.fire({
            icon: "success",
            title: "Registrado",
            text: data.mensaje,
          });
        } else {
          await Swal.fire({
            icon: "error",
            title: "Error",
            text: data.error || data.mensaje || "No se pudo registrar",
          });
        }
      } catch (err) {
        Swal.close();
        await Swal.fire({
          icon: "error",
          title: "Error conexión",
          text: err.message,
        });
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Bienvenido</h2>
        <p className="login-subtitle">Inicia sesión para continuar</p>

        <form onSubmit={handleSubmit}>
          <input
            className="input"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
          <input
            className="input"
            placeholder="Contraseña"
            type="password"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            required
          />
          <button className="btn primary" type="submit">
            Entrar
          </button>
        </form>

        <button className="btn secondary" onClick={handleRegister} type="button">
          Registrarse
        </button>
      </div>
    </div>
  );
}

