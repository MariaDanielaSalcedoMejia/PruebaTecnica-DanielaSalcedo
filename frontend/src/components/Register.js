import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; // Importar axios
import './../styles/register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/api/register', {
        email,
        password,
      });

      // Guardar el token en localStorage
      localStorage.setItem('token', response.data.token);

      // Redirigir al usuario a la página de login
      navigate('/login');
    } catch (error) {
      // Manejar el error, mostrando el mensaje de error
      setError(error.response?.data?.error || 'No se pudo registrar');
    }
  };

  return (
    <div className="register-container">
      <h1 className="homepage-title">Registro</h1>
      <form className="register-form" onSubmit={handleSubmit}>
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
        <button type="submit">Registrarse</button>
        <Link to="/" className="go-home-link">Regresar a la Página de Inicio</Link>
      </form>
    </div>
  );
};

export default Register;
