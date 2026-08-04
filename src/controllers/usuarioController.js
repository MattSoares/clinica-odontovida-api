const Usuario = require('../models/Usuario');

async function criarUsuario(req, res) {
  try {
    const usuario = await Usuario.create(req.body);

    // Nunca retornar a senha (nem o hash) na resposta
    const usuarioSemSenha = usuario.toObject();
    delete usuarioSemSenha.senha;

    res.status(201).json(usuarioSemSenha);
  } catch (erro) {
    res.status(400).json({ mensagem: erro.message });
  }
}

async function listarUsuarios(req, res) {
  try {
    const usuarios = await Usuario.find({ ativo: true }).select('-senha').sort({ nome: 1 });
    res.status(200).json(usuarios);
  } catch (erro) {
    res.status(500).json({ mensagem: erro.message });
  }
}

async function excluirUsuario(req, res) {
  try {
    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      { ativo: false },
      { new: true }
    ).select('-senha');

    if (!usuario) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }

    res.status(200).json({ mensagem: 'Usuário desativado com sucesso', usuario });
  } catch (erro) {
    res.status(500).json({ mensagem: erro.message });
  }
}

module.exports = {
  criarUsuario,
  listarUsuarios,
  excluirUsuario,
};