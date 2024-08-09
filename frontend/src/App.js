import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ConsultaEstudiantes from './components/ConsultaEstudiantes';
import HomePage from './components/HomePage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/consulta" element={<ConsultaEstudiantes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
