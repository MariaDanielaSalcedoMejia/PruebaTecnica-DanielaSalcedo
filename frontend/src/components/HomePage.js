import React from 'react';
import { Link } from 'react-router-dom';
import './../styles/HomePage.css';

function HomePage() {
  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Bienvenido a la Aplicación</h1>
      <div className="homepage-options">
        <div className="homepage-option">
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <div className="option-background register-background">
              <button className="homepage-button btn-register">Registro</button>
            </div>
          </Link>
        </div>
        <div className="homepage-option">
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <div className="option-background login-background">
              <button className="homepage-button btn-login">Inicio de Sesión</button>
            </div>
          </Link>
        </div>
        <div className="homepage-option">
          <Link to="/consulta" style={{ textDecoration: 'none' }}>
            <div className="option-background consulta-background">
              <button className="homepage-button btn-consulta">Consulta</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
