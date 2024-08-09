const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a la base de datos MySQL
const dbConfig = {
  host: '127.0.0.1',
  user: 'root',
  password: '', // Reemplaza con tu contraseña de la base de datos
  database: 'consulta_estudiantes'
};

let db;

const connectToDatabase = async () => {
  try {
    db = await mysql.createPool(dbConfig);
    console.log('Conexión a la base de datos establecida.');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    process.exit(1); // Termina el proceso si no se puede conectar a la base de datos
  }
};

connectToDatabase();

// Endpoint para consultar estudiante desde la API externa
app.post('/api/consulta-estudiante', async (req, res) => {
  const { documento } = req.body;
  try {
    const response = await axios.get('https://api.talentotech.cymetria.com/api/v1/blockchain/obtener-estudiantes-aprobados');
    const estudiante = response.data.find(est => est.numero_documento === documento);
    if (estudiante) {
      res.status(200).json(estudiante);
    } else {
      res.status(404).json({ error: 'Estudiante no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error en la consulta a la API' });
  }
});

// Registro de usuarios
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await db.query('INSERT INTO usuarios (email, password) VALUES (?, ?)', [email, hashedPassword]);
    const token = jwt.sign({ email }, 'secretKey');
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error en el registro' });
  }
});

// Inicio de sesión de usuarios
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const [user] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (user.length > 0) {
      const isMatch = await bcrypt.compare(password, user[0].password);
      if (isMatch) {
        const token = jwt.sign({ email }, 'secretKey');
        res.status(200).json({ token });
      } else {
        res.status(401).json({ error: 'Contraseña incorrecta' });
      }
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error en el inicio de sesión' });
  }
});

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('Token requerido.');
  try {
    const decoded = jwt.verify(token, 'secretKey');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send('Token inválido.');
  }
};

// Aplicar el middleware de verificación de token a rutas protegidas
app.use('/api/consulta-estudiante', verifyToken);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
