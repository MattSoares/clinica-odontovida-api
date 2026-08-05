const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// rotas

const pacienteRoutes = require('./routes/pacienteRoutes.js');
const profissionalRoutes = require('./routes/profissionalRoutes.js');
const consultaRoutes = require('./routes/consultaRoutes.js');
const usuarioRoutes = require('./routes/usuarioRoutes.js');
const authRoutes = require('./routes/authRoutes.js');

app.use('/api/pacientes', pacienteRoutes);
app.use('/api/profissionais', profissionalRoutes);
app.use('/api/consultas', consultaRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;