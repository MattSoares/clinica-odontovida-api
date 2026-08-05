import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api.js';
import { converterDataHoraParaApi } from '../../utils/horariosConsulta.js';
import {
  CabecalhoPagina,
  Formulario,
  Campo,
  Label,
  Input,
  MensagemErro,
  EstadoDisponibilidade,
  TextoAjuda,
  Acoes,
  BotaoSalvar,
  BotaoCancelar,
} from '../NovoPaciente/styles.js';
import { Select } from '../EditarConsulta/styles.js';

const DURACAO_CONSULTA_MS = 60 * 60 * 1000;

function obterDataHoje() {
  const agora = new Date();
  const ano = agora.getFullYear();
  const mes = String(agora.getMonth() + 1).padStart(2, '0');
  const dia = String(agora.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

function criarHorariosDisponiveis(data, profissional, consultas) {
  if (!data || !profissional) return [];

  const dataSelecionada = new Date(`${data}T12:00:00`);
  const diaSemana = dataSelecionada.getDay();
  if (diaSemana === 0 || diaSemana === 6) return [];

  const agora = new Date();
  const horarios = [];

  for (let minutos = 9 * 60; minutos <= 17 * 60; minutos += 5) {
    const fimEmMinutos = minutos + 60;
    const ocupaAlmoco = minutos < 13 * 60 && fimEmMinutos > 12 * 60;
    if (ocupaAlmoco) continue;

    const hora = String(Math.floor(minutos / 60)).padStart(2, '0');
    const minuto = String(minutos % 60).padStart(2, '0');
    const valor = `${hora}:${minuto}`;
    const inicio = new Date(`${data}T${valor}:00`);
    const fim = new Date(inicio.getTime() + DURACAO_CONSULTA_MS);

    if (inicio <= agora) continue;

    const possuiConflito = consultas.some((consulta) => {
      const profissionalId =
        consulta.profissional?._id || consulta.profissional;

      if (
        profissionalId !== profissional ||
        consulta.status === 'cancelada'
      ) {
        return false;
      }

      const inicioExistente = new Date(consulta.dataHora);
      const fimExistente = new Date(
        inicioExistente.getTime() + DURACAO_CONSULTA_MS
      );

      return inicioExistente < fim && fimExistente > inicio;
    });

    if (!possuiConflito) {
      horarios.push(valor);
    }
  }

  return horarios;
}

export default function NovaConsulta() {
  const [pacientes, setPacientes] = useState([]);
  const [profissionais, setProfissionais] = useState([]);
  const [consultas, setConsultas] = useState([]);
  const [paciente, setPaciente] = useState('');
  const [profissional, setProfissional] = useState('');
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  const navigate = useNavigate();

  const horariosDisponiveis = useMemo(
    () => criarHorariosDisponiveis(data, profissional, consultas),
    [data, profissional, consultas]
  );

  useEffect(() => {
    async function carregarDados() {
      try {
        const [respostaPacientes, respostaProfissionais, respostaConsultas] =
          await Promise.all([
            api.get('/pacientes'),
            api.get('/profissionais'),
            api.get('/consultas'),
          ]);

        setPacientes(respostaPacientes.data);
        setProfissionais(respostaProfissionais.data);
        setConsultas(respostaConsultas.data);
      } catch {
        setErro('Não foi possível carregar os dados do formulário');
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setErro('');

    if (!horario || !horariosDisponiveis.includes(horario)) {
      setErro('Horário indisponível');
      return;
    }

    setSalvando(true);

    try {
      await api.post('/consultas', {
        paciente,
        profissional,
        dataHora: converterDataHoraParaApi(`${data}T${horario}`),
      });
      navigate('/agenda');
    } catch (erroRequisicao) {
      const status = erroRequisicao.response?.status;
      setErro(
        status === 400 || status === 409
          ? 'Horário indisponível'
          : 'Não foi possível cadastrar a consulta'
      );
    } finally {
      setSalvando(false);
    }
  }

  if (carregando) return <p>Carregando formulário...</p>;

  return (
    <>
      <CabecalhoPagina>
        <h1>Nova consulta</h1>
        <p>Selecione o paciente, o profissional e um horário disponível.</p>
      </CabecalhoPagina>

      {erro && <MensagemErro>{erro}</MensagemErro>}

      <Formulario onSubmit={handleSubmit}>
        <Campo>
          <Label htmlFor="paciente">Paciente</Label>
          <Select
            id="paciente"
            value={paciente}
            onChange={(event) => setPaciente(event.target.value)}
            required
          >
            <option value="">Selecione um paciente</option>
            {pacientes.map((item) => (
              <option key={item._id} value={item._id}>
                {item.nome}
              </option>
            ))}
          </Select>
        </Campo>

        <Campo>
          <Label htmlFor="profissional">Profissional</Label>
          <Select
            id="profissional"
            value={profissional}
            onChange={(event) => {
              setProfissional(event.target.value);
              setHorario('');
            }}
            required
          >
            <option value="">Selecione um profissional</option>
            {profissionais.map((item) => (
              <option key={item._id} value={item._id}>
                {item.nome} — {item.especialidade}
              </option>
            ))}
          </Select>
        </Campo>

        <Campo>
          <Label htmlFor="data">Data</Label>
          <Input
            id="data"
            type="date"
            min={obterDataHoje()}
            value={data}
            onChange={(event) => {
              setData(event.target.value);
              setHorario('');
            }}
            required
          />
        </Campo>

        <Campo>
          <Label htmlFor="horario">Horário disponível</Label>
          <Select
            id="horario"
            value={horario}
            onChange={(event) => setHorario(event.target.value)}
            disabled={!data || !profissional || horariosDisponiveis.length === 0}
            required
          >
            <option value="">Selecione um horário</option>
            {horariosDisponiveis.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>

          {!data || !profissional ? (
            <TextoAjuda>Selecione o profissional e a data primeiro.</TextoAjuda>
          ) : horariosDisponiveis.length === 0 ? (
            <EstadoDisponibilidade>
              Não há horários disponíveis para esta data.
            </EstadoDisponibilidade>
          ) : null}
        </Campo>

        <Acoes>
          <BotaoSalvar type="submit" disabled={salvando || !horario}>
            {salvando ? 'Salvando...' : 'Cadastrar consulta'}
          </BotaoSalvar>
          <BotaoCancelar
            type="button"
            onClick={() => navigate('/agenda')}
            disabled={salvando}
          >
            Cancelar
          </BotaoCancelar>
        </Acoes>
      </Formulario>
    </>
  );
}
