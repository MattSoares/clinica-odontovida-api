const mongoose = require('mongoose');

const pacienteSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'O nome do paciente é obrigatório'],
    trim: true,
  },
  telefone: {
    type: String,
    required: [true, 'O telefone é obrigatório'],
    trim: true,
  },
  dataNascimento: {
    type: Date,
    required: false,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  historico: {
    type: String,
    default: '',
  },
  ativo: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Paciente', pacienteSchema);