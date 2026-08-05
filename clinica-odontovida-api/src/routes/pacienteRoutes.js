const express = require('express');
const router = express.Router();

const {
    criarPaciente,
    listarPacientes,
    buscarPacientePorId,
    atualizarPaciente,
    excluirPaciente,
} = require('../controllers/pacienteController.js');

const verificarToken = require('../middlewares/authMiddleware.js');
const permitirPapeis = require('../middlewares/papelMiddleware.js');

router.use(verificarToken);

router.post('/', permitirPapeis('admin', 'recepcionista'), criarPaciente);
router.get('/', permitirPapeis('admin', 'recepcionista', 'dentista'), listarPacientes);
router.get('/:id', permitirPapeis('admin', 'recepcionista', 'dentista'), buscarPacientePorId);
router.put('/:id', permitirPapeis('admin', 'recepcionista'), atualizarPaciente);
router.delete('/:id', permitirPapeis('admin', 'recepcionista'), excluirPaciente);

module.exports = router;