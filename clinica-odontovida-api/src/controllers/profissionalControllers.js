const Profissional = require('../models/Profissional.js');

//CRUD

//cria um novo profissional

async function criarProfissional(req, res) {
    try {
        const profissional = await Profissional.create(req.body);
        res.status(201).json(profissional);
    } catch (erro) {
        res.status(400).json({ mensagem: erro.message });
    }
}

//lista todos os profissionais

async function listarProfissionais(req, res) {
  try {
    const profissionais = await Profissional.find({ ativo: true }).sort({ nome: 1 });
    res.status(200).json(profissionais);
  } catch (erro) {
    res.status(500).json({ mensagem: erro.message });
  }
}

//busca profissional por ID
async function buscarProfissionalPorId(req, res) {
    try {
        const profissional = await Profissional.findById(req.params.id);

        if (!profissional) {
            return res.status(404).json({ mensagem: 'Profissional não encontrado' });
        }

        res.status(200).json(profissional);
    } catch (erro) {
        res.status(500).json({ mensagem: erro.message });
    }
}

//atualiza profissional por ID
async function atualizarProfissional(req, res) {
    try {
        const profissional = await Profissional.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!profissional) {
            return res.status(404).json({ mensagem: 'Profissional não encontrado' });
        }

        res.status(200).json(profissional);
    } catch (erro) {
        res.status(400).json({ mensagem: erro.message });
    }
}

//exclui profissional por ID
async function excluirProfissional(req, res) {
    try {
        const profissional = await Profissional.findByIdAndUpdate(
            req.params.id,
            { ativo: false },
            { new: true }
        );

    if (!profissional) {
        return res.status(404).json({ mensagem: 'Profissional não encontrado' });
    }

    res.status(200).json({ mensagem: 'Profissional desativado com sucesso' });
    } catch (erro) {
        res.status(500).json({ mensagem: erro.message });
    }
}

module.exports = {
    criarProfissional,
    listarProfissionais,
    buscarProfissionalPorId,
    atualizarProfissional,
    excluirProfissional,
};