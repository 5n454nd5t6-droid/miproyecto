const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// CORS CONFIG (sin * porque da error en tu versión)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use(express.json());

// RUTAS
const authRoutes = require('./src/routes/auth');
app.use('/api/auth', authRoutes);

// TEST
app.get('/', (req, res) => {
  res.send('Backend funcionando correctamente');
});

// SERVIDOR
app.listen(4000, () => {
  console.log('Servidor backend corriendo en http://localhost:4000');
});

// CONEXIÓN A MONGO ATLAS
mongoose.connect('mongodb+srv://ivansinxd_db_user:pEXb8UETZ5HA8Fol@cluster0.v8etjg3.mongodb.net/ivansinxd_db_user')
  .then(() => console.log('MongoDB Atlas conectado'))
  .catch(err => console.log('Error conectando a MongoDB Atlas:', err));
