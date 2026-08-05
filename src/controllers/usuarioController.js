const Usuario = require('../models/Usuario');

async function criarUsuario(req, res) {
  try {
    if (req.usuario.papel !== 'admin' && req.body.papel === 'admin') {
      return res.status(403).json({
        mensagem: 'Apenas administradores podem criar outro administrador',
    });
}
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
    const usuarios = await Usuario.find({ ativo: true })
      .select('-senha')
      .populate('profissionalRef', 'nome especialidade')
      .sort({ nome: 1 });
    res.status(200).json(usuarios);
  } catch (erro) {
    res.status(500).json({ mensagem: erro.message });
  }
}

async function buscarUsuarioPorId(req, res) {
  try {
    const usuario = await Usuario.findById(req.params.id)
      .select('-senha')
      .populate('profissionalRef', 'nome especialidade');

    if (!usuario || !usuario.ativo) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }

    if (usuario.papel === 'admin' && req.usuario.papel !== 'admin') {
      return res.status(403).json({
        mensagem: 'Apenas administradores podem editar outro administrador',
      });
    }

    res.status(200).json(usuario);
  } catch (erro) {
    res.status(500).json({ mensagem: erro.message });
  }
}

async function atualizarUsuario(req, res) {
  try {
    const usuario = await Usuario.findById(req.params.id);

    if (!usuario || !usuario.ativo) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }

    if (usuario.papel === 'admin' && req.usuario.papel !== 'admin') {
      return res.status(403).json({
        mensagem: 'Apenas administradores podem editar outro administrador',
      });
    }

    const novoPapel = req.body.papel || usuario.papel;

    if (novoPapel === 'admin' && req.usuario.papel !== 'admin') {
      return res.status(403).json({
        mensagem: 'Apenas administradores podem definir esse papel',
      });
    }

    if (usuario._id.toString() === req.usuario.id && novoPapel !== usuario.papel) {
      return res.status(400).json({
        mensagem: 'Você não pode alterar o papel da própria conta',
      });
    }

    if (req.body.senha !== undefined && req.usuario.papel !== 'admin') {
      return res.status(403).json({
        mensagem: 'Apenas administradores podem alterar senhas',
      });
    }

    usuario.nome = req.body.nome ?? usuario.nome;
    usuario.email = req.body.email ?? usuario.email;
    usuario.papel = novoPapel;
    usuario.profissionalRef =
      novoPapel === 'dentista' ? req.body.profissionalRef : undefined;

    if (req.body.senha !== undefined) {
      usuario.senha = req.body.senha;
    }

    await usuario.save();

    const usuarioAtualizado = await Usuario.findById(usuario._id)
      .select('-senha')
      .populate('profissionalRef', 'nome especialidade');

    res.status(200).json(usuarioAtualizado);
  } catch (erro) {
    res.status(400).json({ mensagem: erro.message });
  }
}

async function excluirUsuario(req, res) {
  try {
    const usuarioAtual = await Usuario.findById(req.params.id);

    if (!usuarioAtual) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }

    if (usuarioAtual._id.toString() === req.usuario.id) {
      return res.status(400).json({ mensagem: 'Você não pode desativar a própria conta' });
    }

    if (usuarioAtual.papel === 'admin' && req.usuario.papel !== 'admin') {
      return res.status(403).json({
        mensagem: 'Apenas administradores podem desativar outro administrador',
      });
    }

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
  buscarUsuarioPorId,
  atualizarUsuario,
  excluirUsuario,
};
