const express = require('express');
const router = express.Router();

const verificarToken = require('../middlewares/authMiddleware.js');
const permitirPapeis = require('../middlewares/papelMiddleware.js');

const {
    criarConsulta,
    listarConsultas,
    buscarConsultaPorId,
    atualizarConsulta,
    cancelarConsulta,
} = require('../controllers/consultaController.js');

router.use(verificarToken);

router.post('/', permitirPapeis('admin', 'recepcionista'), criarConsulta);
router.get('/', permitirPapeis('admin', 'recepcionista', 'dentista'), listarConsultas);
router.get('/:id', permitirPapeis('admin', 'recepcionista', 'dentista'), buscarConsultaPorId);
router.put('/:id', permitirPapeis('admin', 'recepcionista'), atualizarConsulta);
router.delete('/:id', permitirPapeis('admin', 'recepcionista'), cancelarConsulta);

module.exports = router;