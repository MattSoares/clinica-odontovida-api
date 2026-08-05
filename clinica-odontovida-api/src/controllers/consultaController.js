const Consulta = require('../models/Consulta.js');

const DURACAO_CONSULTA_MS = 60 * 60 * 1000;
const FUSO_CLINICA = 'America/Sao_Paulo';

function obterPartesHorarioClinica(data) {
    const formatador = new Intl.DateTimeFormat('en-US', {
        timeZone: FUSO_CLINICA,
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23',
    });

    return Object.fromEntries(
        formatador.formatToParts(data).map((parte) => [parte.type, parte.value])
    );
}

function validarHorarioAtendimento(dataHora) {
    const data = new Date(dataHora);

    if (Number.isNaN(data.getTime())) {
        return 'Data e horário inválidos';
    }

    const partes = obterPartesHorarioClinica(data);
    const diasUteis = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const inicioEmMinutos = Number(partes.hour) * 60 + Number(partes.minute);
    const fimEmMinutos = inicioEmMinutos + 60;

    if (!diasUteis.includes(partes.weekday)) {
        return 'As consultas podem ser marcadas somente de segunda a sexta-feira';
    }

    if (inicioEmMinutos < 9 * 60 || fimEmMinutos > 18 * 60) {
        return 'O atendimento funciona das 09:00 às 18:00 e cada consulta dura 1 hora';
    }

    const sobrepoeAlmoco = inicioEmMinutos < 13 * 60 && fimEmMinutos > 12 * 60;

    if (sobrepoeAlmoco) {
        return 'Não há atendimento entre 12:00 e 13:00 devido ao horário de almoço';
    }

    return null;
}

async function buscarConflito({ profissional, dataHora, consultaIgnorada }) {
    const inicio = new Date(dataHora);
    const limiteAnterior = new Date(inicio.getTime() - DURACAO_CONSULTA_MS);
    const fim = new Date(inicio.getTime() + DURACAO_CONSULTA_MS);

    const filtro = {
        profissional,
        dataHora: { $gt: limiteAnterior, $lt: fim },
        status: { $ne: 'cancelada' },
    };

    if (consultaIgnorada) {
        filtro._id = { $ne: consultaIgnorada };
    }

    return Consulta.findOne(filtro);
}

async function criarConsulta(req, res) {
    try {
        const { paciente, profissional, dataHora } = req.body;

        const erroHorario = validarHorarioAtendimento(dataHora);

        if (erroHorario) {
            return res.status(400).json({ mensagem: erroHorario });
        }

        const conflito = await buscarConflito({
            profissional,
            dataHora,
        });

        if (conflito) {
            return res.status(400).json({
                mensagem: 'Esse profissional já possui uma consulta nesse intervalo de 1 hora' });
        }

        const consulta = await Consulta.create({
            paciente,
            profissional,
            dataHora,
            registradaPor: req.usuario.id,
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
    const consultaAtual = await Consulta.findById(req.params.id);

    if (!consultaAtual) {
      return res.status(404).json({
        mensagem: 'Consulta não encontrada',
      });
    }

    const atualizacoes = { ...req.body };

    // Impede a alteração do usuário que registrou a consulta
    delete atualizacoes.registradaPor;

    const profissionalFinal =
      atualizacoes.profissional || consultaAtual.profissional;
    const dataHoraFinal = atualizacoes.dataHora || consultaAtual.dataHora;

    const erroHorario = validarHorarioAtendimento(dataHoraFinal);

    if (erroHorario) {
      return res.status(400).json({ mensagem: erroHorario });
    }

    if (atualizacoes.profissional || atualizacoes.dataHora) {
      const conflito = await buscarConflito({
        profissional: profissionalFinal,
        dataHora: dataHoraFinal,
        consultaIgnorada: req.params.id,
      });

      if (conflito) {
        return res.status(409).json({
          mensagem:
            'Esse profissional já possui uma consulta nesse intervalo de 1 hora',
        });
      }
    }

    const consulta = await Consulta.findByIdAndUpdate(
      req.params.id,
      atualizacoes,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json(consulta);
  } catch (erro) {
    res.status(400).json({
      mensagem: erro.message,
    });
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
