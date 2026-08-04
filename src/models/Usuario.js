const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'O nome do usuário é obrigatório'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'O email é obrigatório'],
        unique: true,
        trim: true,
        lowercase: true,
    },
    senha: {
        type: String,
        required: [true, 'A senha é obrigatória'],
        minlength: [6, 'A senha deve ter no mínimo 6 caracteres'],
    },
    papel: {
        type: String,
        enum: ['recepcionista', 'dentista', 'admin'],
        required: true,
    },
    profissionalRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profissional',
        required: false,
    },
    ativo: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});


//antes de salvar o usuário, criptografa a senha
usuarioSchema.pre('save', async function () {
  if (!this.isModified('senha')) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.senha = await bcrypt.hash(this.senha, salt);
});

//compara senha digitada com a senha armazenada no banco de dados
usuarioSchema.methods.compararSenha = async function (senhaDigitada) {
    return await bcrypt.compare(senhaDigitada, this.senha);
};


module.exports = mongoose.model('Usuario', usuarioSchema);