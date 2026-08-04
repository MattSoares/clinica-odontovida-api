const express = require('express');
const router = express.Router();

const {
    criarProfissional,
    listarProfissionais,
    buscarProfissionalPorId,
    atualizarProfissional,
    excluirProfissional,
} = require('../controllers/profissionalControllers.js');

const verificarToken = require('../middlewares/authMiddleware.js');
const permitirPapeis = require('../middlewares/papelMiddleware.js');

router.use(verificarToken);

router.post('/', permitirPapeis('admin', 'recepcionista'), criarProfissional);
router.get('/', permitirPapeis('admin', 'recepcionista', 'dentista'), listarProfissionais);
router.get('/:id', permitirPapeis('admin', 'recepcionista', 'dentista'), buscarProfissionalPorId);
router.put('/:id', permitirPapeis('admin', 'recepcionista'), atualizarProfissional);
router.delete('/:id', permitirPapeis('admin', 'recepcionista'), excluirProfissional);

module.exports = router;