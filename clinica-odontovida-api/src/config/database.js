const mongoose = require('mongoose');

async function conectarBanco() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB conectado com sucesso');
  } catch (erro) {
    console.error('Erro completo:');
    console.error(erro);
    process.exit(1);
  }
}

module.exports = conectarBanco;