const mongoose = require('mongoose');

const consultaSchema = new mongoose.Schema({
    paciente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Paciente',
        required: [true, 'A consulta deve estar associada a um paciente'],
    },
    profissional: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profissional',
        required: [true, 'A consulta deve estar associada a um profissional'],
    },
    registradaPor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'A consulta deve ser registrada por um usuário'],
    },
    dataHora: {
        type: Date,
        required: [true, 'A data e hora da consulta são obrigatórias'],
    },
    status: {
        type: String,
        enum: ['agendada', 'confirmada', 'cancelada', 'concluida'],
        default: 'agendada',
    },
    observacoes: {
        type: String,
        default: '',
        trim: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Consulta', consultaSchema);