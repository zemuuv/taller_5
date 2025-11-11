import React from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard({ user, onLogout }) {
  const navigate = useNavigate();

  if (!user) {
    navigate("/");
    return null;
  }

  const handleLogout = () => {
    onLogout && onLogout();
    Swal.fire({ icon: "info", title: "Sesión cerrada" });
    navigate("/");
  };

  const handleCargar = async () => {
    const confirm = await Swal.fire({
      title: "¿Desea cargar la información?",
      showCancelButton: true,
      confirmButtonText: "Sí, cargar",
      cancelButtonText: "No",
      background: "#1e1e1e",
      color: "#fff",
    });
    if (!confirm.isConfirmed) return;

    Swal.fire({
      title: "Procesando carga...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
      background: "#1e1e1e",
      color: "#fff",
    });
    try {
      const resp = await fetch("http://localhost:4000/api/cargar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await resp.json();
      Swal.close();
      if (resp.ok && data.ok) {
        await Swal.fire({
          icon: "success",
          title: "Carga completa",
          text: `Registros leídos: ${data.detalle?.lectura?.registros ?? "N/A"}`,
          background: "#1e1e1e",
          color: "#fff",
        });
      } else {
        await Swal.fire({
          icon: "error",
          title: "Error en carga",
          text: data.error || JSON.stringify(data),
          background: "#1e1e1e",
          color: "#fff",
        });
      }
    } catch (err) {
      Swal.close();
      await Swal.fire({
        icon: "error",
        title: "Error conexión",
        text: err.message,
        background: "#1e1e1e",
        color: "#fff",
      });
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>📊 Panel de Control</h2>
        <div className="user-info">
          <span className="username">{user}</span>
          <button className="btn secondary" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="card">
          <p>
            Desde aquí puedes ejecutar la carga de <strong>CSV → BD → correo</strong>.
          </p>
          <button className="btn primary" onClick={handleCargar}>
            🚀 Cargar información
          </button>
        </div>
      </div>
    </div>
  );
}
