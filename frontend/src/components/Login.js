import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './../styles/login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Error en el inicio de sesión');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      navigate('/consulta');
    } catch (error) {
      setError('No se pudo iniciar sesión');
    }
  };

  return (
    <div className="login-container">
      <h1 className="homepage-title">Inicio de Sesión</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        {error && <p>{error}</p>}
        <button type="submit">Iniciar Sesión</button>
        <Link to="/" className="go-home-link">Regresar a la Página de Inicio</Link>
      </form>
    </div>
  );
};

export default Login;
