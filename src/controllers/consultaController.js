const Consulta = require('../models/Consulta.js');

async function criarConsulta(req, res) {
    try {
        const { paciente, profissional, dataHora, registradaPor } = req.body;

    
        const conflito = await Consulta.findOne({
            profissional,
            dataHora,
            status: { $ne: 'cancelada' },
        });

        if (conflito) {
            return res.status(400).json({
                mensagem: 'Já existe uma consulta agendada para este horário e profissional' });
        }

        const consulta = await Consulta.create({
            paciente,
            profissional,
            dataHora,
            registradaPor,
        });

        res.status(201).json(consulta);
    } catch (erro) {
        res.status(400).json({ mensagem: erro.message });
    }
}

async function listarConsultas(req, res) {
    try {
        const consultas = await Consulta.find()
            .populate('paciente', 'nome telefone')
            .populate('profissional', 'nome especialidade')
            .populate('registradaPor', 'nome')
            .sort({ dataHora: 1 });

        res.status(200).json(consultas);
    } catch (erro) {
        res.status(500).json({ mensagem: erro.message });
    }
}

async function buscarConsultaPorId(req, res) {
    try {
        const consulta = await Consulta.findById(req.params.id)
            .populate('paciente', 'nome telefone')
            .populate('profissional', 'nome especialidade')
            .populate('registradaPor', 'nome');

        if (!consulta) {
            return res.status(404).json({ mensagem: 'Consulta não encontrada' });
        }

        res.status(200).json(consulta);
    } catch (erro) {
        res.status(500).json({ mensagem: erro.message });
    }
}

async function atualizarConsulta(req, res) {
  try {
    const { profissional, dataHora } = req.body;

    if (profissional && dataHora) {
      const conflito = await Consulta.findOne({
        _id: { $ne: req.params.id },
        profissional,
        dataHora,
        status: { $ne: 'cancelada' },
      });

      if (conflito) {
        return res.status(409).json({
          mensagem: 'Esse profissional já tem uma consulta marcada nesse horário',
        });
      }
    }

    const consulta = await Consulta.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!consulta) {
        return res.status(404).json({ mensagem: 'Consulta não encontrada' });
    }

    res.status(200).json(consulta);
  } catch (erro) {
    res.status(400).json({ mensagem: erro.message });
  }
}

async function cancelarConsulta(req, res) {
    try {
        const consulta = await Consulta.findByIdAndUpdate(
            req.params.id,
            { status: 'cancelada' },
            { new: true }
        );

        if (!consulta) {
            return res.status(404).json({ mensagem: 'Consulta não encontrada' });
        }

        res.status(200).json(consulta);
    } catch (erro) {
        res.status(500).json({ mensagem: erro.message });
    }
}

module.exports = {
    criarConsulta,
    listarConsultas,
    buscarConsultaPorId,
    atualizarConsulta,
    cancelarConsulta,
};