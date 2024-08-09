import React, { useState } from 'react';
import axios from 'axios';

const FormConsulta = () => {
  const [documento, setDocumento] = useState('');
  const [error, setError] = useState('');
  const [resultado, setResultado] = useState(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setDocumento(value);
    if (/^\d+$/.test(value) && value.length >= 6 && value.length <= 10) {
      if (/(\d)\1{5,}/.test(value) || /(012|123|234|345|456|567|678|789|890)+/.test(value)) {
        setError('El documento no debe contener secuencias repetidas.');
      } else {
        setError('');
      }
    } else {
      setError('El documento debe tener entre 6 y 10 dígitos.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!error) {
      try {
        const response = await axios.post('/api/consulta-estudiante', { documento });
        setResultado(response.data);
      } catch (error) {
        setResultado({ error: 'Estudiante no encontrado o error en la consulta.' });
      }
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="documento" className="form-label">Número de Documento</label>
          <input 
            type="text" 
            className="form-control" 
            id="documento" 
            value={documento} 
            onChange={handleChange} 
            required 
          />
          {error && <div className="text-danger">{error}</div>}
        </div>
        <button type="submit" className="btn btn-primary">Consultar</button>
      </form>
      {resultado && (
        <div className="mt-3">
          {resultado.error ? (
            <div className="alert alert-danger">{resultado.error}</div>
          ) : (
            <div>
              <p><strong>Nombre Completo:</strong> {resultado.nombre_completo}</p>
              <p><strong>Número de Documento:</strong> {resultado.numero_documento}</p>
              <p><strong>Correo Electrónico:</strong> {resultado.correo}</p>
              <p><strong>Nombre del Curso:</strong> {resultado.curso}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FormConsulta;
