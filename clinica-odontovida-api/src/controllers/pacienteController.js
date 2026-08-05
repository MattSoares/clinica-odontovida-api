const Paciente = require('../models/Paciente.js');


//cria um novo paciente
async function criarPaciente(req, res) {
    try {
        const paciente = await Paciente.create(req.body);
        res.status(201).json(paciente);
    } catch (erro) {
        res.status(400).json({ mensagem: erro.message });
    }
}

//lista todos os pacientes
async function listarPacientes(req, res) {
  try {
    const pacientes = await Paciente.find({ ativo: true }).sort({ nome: 1 });
    res.status(200).json(pacientes);
  } catch (erro) {
    res.status(500).json({ mensagem: erro.message });
  }
}

//busca paciente por ID
async function buscarPacientePorId(req, res) {
    try {
        const paciente = await Paciente.findById(req.params.id);

        if (!paciente) {
            return res.status(404).json({ mensagem: 'Paciente não encontrado' });
        }

        res.status(200).json(paciente);
    } catch (erro) {
        res.status(500).json({ mensagem: erro.message });
    }
}

//atualiza paciente por ID
async function atualizarPaciente(req, res) {
    try {
        const paciente = await Paciente.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!paciente) {
            return res.status(404).json({ mensagem: 'Paciente não encontrado' });
        }

        res.status(200).json(paciente);
    } catch (erro) {
        res.status(400).json({ mensagem: erro.message });
    }
}

//exclui paciente por ID 
async function excluirPaciente(req, res) {
  try {
    const paciente = await Paciente.findByIdAndUpdate(
      req.params.id,
      { ativo: false },
      { new: true }
    );

    if (!paciente) {
      return res.status(404).json({ mensagem: 'Paciente não encontrado' });
    }

    res.status(200).json({ mensagem: 'Paciente desativado com sucesso' });
  } catch (erro) {
    res.status(500).json({ mensagem: erro.message });
  }
}

module.exports = {
    criarPaciente,
    listarPacientes,
    buscarPacientePorId,
    atualizarPaciente,
    excluirPaciente,
};
