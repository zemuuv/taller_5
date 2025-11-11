import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import './App.css'; // Importamos los estilos globales

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route path="/" element={<Login onSuccess={(u) => setUser(u)} />} />
          <Route
            path="/dashboard"
            element={
              user ? (
                <Dashboard user={user} onLogout={() => setUser(null)} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
