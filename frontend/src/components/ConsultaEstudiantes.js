import React, { useState } from 'react';
import {Link } from 'react-router-dom';
import './../styles/consultaEstudiantes.css';

const ConsultaEstudiantes = () => {
  const [documento, setDocumento] = useState('');
  const [estudiante, setEstudiante] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/consulta-estudiante', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ documento }),
      });

      if (!response.ok) {
        throw new Error('Error en la consulta');
      }

      const data = await response.json();
      setEstudiante(data);
    } catch (error) {
      setError('No se pudo realizar la consulta');
    }
  };

  return (
    <div className="consulta-container">
      <h1 className="homepage-title">Consulta de Estudiantes</h1>
      <form className="consulta-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={documento}
          onChange={(e) => setDocumento(e.target.value)}
          placeholder="Número de Documento"
          required
        />
        <button type="submit">Consultar</button>
        <Link to="/" className="go-home-link">Regresar a la Página de Inicio</Link>
      </form>
      {error && <p className="error-message">{error}</p>}
      {estudiante && (
        <div className="student-info">
          <h3>Estudiante Aprobado</h3>
          <p>Nombre: {estudiante.nombre}</p>
          <p>Documento: {estudiante.numero_documento}</p>
         
        </div>
        
      )}
    </div>
  );
};

export default ConsultaEstudiantes;
