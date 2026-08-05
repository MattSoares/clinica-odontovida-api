const mongoose = require('mongoose');

const horarioDisponivelSchema = new mongoose.Schema({
    diaSemana: {
        type: String,
        enum: ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'],
        required: true,
    },
    horaInicio: {
        type: String,
        required: true,
    },
    horaFim: {
        type: String,
        required: true,
    },
}, { _id: false });

const profissionalSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'O nome do profissional é obrigatório'],
        trim: true,
    },
    especialidade: {
        type: String,
        required: [true, 'A especialidade é obrigatória'],
        trim: true,
    },
    telefone: {
        type: String,
        trim: true,
    },
    horariosDisponiveis: {
        type: [horarioDisponivelSchema],
        default: [],
    },
    ativo: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Profissional', profissionalSchema);