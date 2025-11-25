const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

// Registro
router.post('/register', async (req, res) => {
  try {
    console.log("Datos recibidos en backend:", req.body);
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ msg: "El email ya está registrado" });

    const hash = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hash
    });

    await newUser.save();

    res.json({ msg: "Usuario registrado correctamente" });

  } catch (error) {
    res.status(500).json({ msg: "Error en el servidor" });
  }
});

// Login
router.post('/login', async (req, res) => {
  console.log("Datos recibidos en login:", req.body);  // ← IMPORTANTE
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
console.log("Usuario encontrado:", user);
    if (!user) return res.status(400).json({ msg: "Usuario no encontrado" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ msg: "Contraseña incorrecta" });

    res.json({ msg: "Login exitoso", user });

  } catch (error) {
    res.status(500).json({ msg: "Error en el servidor" });
  }
});

module.exports = router;
