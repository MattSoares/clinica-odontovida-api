const express = require('express');
const router = express.Router();

const verificarToken = require('../middlewares/authMiddleware.js');
const permitirPapeis = require('../middlewares/papelMiddleware.js');

const {
  criarUsuario,
  listarUsuarios,
  buscarUsuarioPorId,
  atualizarUsuario,
  excluirUsuario,
} = require('../controllers/usuarioController.js');

router.use(verificarToken);
router.use(permitirPapeis('admin', 'recepcionista'));

router.post('/', criarUsuario);
router.get('/', listarUsuarios);
router.get('/:id', buscarUsuarioPorId);
router.put('/:id', atualizarUsuario);
router.delete('/:id', excluirUsuario);

module.exports = router;
