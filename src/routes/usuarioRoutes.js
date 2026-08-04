const express = require('express');
const router = express.Router();

const verificarToken = require('../middlewares/authMiddleware.js');
const permitirPapeis = require('../middlewares/papelMiddleware.js');

const { criarUsuario, listarUsuarios, excluirUsuario } = require('../controllers/usuarioController.js');

router.use(verificarToken);
router.use(permitirPapeis('admin', 'recepcionista'));

router.post('/', criarUsuario);
router.get('/', listarUsuarios);
router.delete('/:id', excluirUsuario);

module.exports = router;