export function validarHorarioConsulta(valor) {
  if (!valor) return 'Informe a data e o horário da consulta';

  const data = new Date(valor);
  if (Number.isNaN(data.getTime())) return 'Data e horário inválidos';

  const diaSemana = data.getDay();
  const inicioEmMinutos = data.getHours() * 60 + data.getMinutes();
  const fimEmMinutos = inicioEmMinutos + 60;

  if (diaSemana === 0 || diaSemana === 6) {
    return 'As consultas podem ser marcadas somente de segunda a sexta-feira';
  }

  if (inicioEmMinutos < 9 * 60 || fimEmMinutos > 18 * 60) {
    return 'Escolha um horário entre 09:00 e 17:00';
  }

  if (inicioEmMinutos < 13 * 60 && fimEmMinutos > 12 * 60) {
    return 'Não há atendimento entre 12:00 e 13:00 devido ao almoço';
  }

  return null;
}

export function converterDataHoraParaApi(valor) {
  return new Date(valor).toISOString();
}
