import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/api.js';
import {
  converterDataHoraParaApi,
  validarHorarioConsulta,
} from '../../utils/horariosConsulta.js';
import {
  CabecalhoPagina,
  Formulario,
  Campo,
  Label,
  Input,
  Textarea,
  MensagemErro,
  Acoes,
  BotaoSalvar,
  BotaoCancelar,
  TextoAjuda,
} from '../NovoPaciente/styles.js';
import { Select } from './styles.js';

function formatarParaInput(dataHora) {
  if (!dataHora) return '';
  const data = new Date(dataHora);
  const dataLocal = new Date(data.getTime() - data.getTimezoneOffset() * 60000);
  return dataLocal.toISOString().slice(0, 16);
}

export default function EditarConsulta() {
  const [pacientes, setPacientes] = useState([]);
  const [profissionais, setProfissionais] = useState([]);
  const [paciente, setPaciente] = useState('');
  const [profissional, setProfissional] = useState('');
  const [dataHora, setDataHora] = useState('');
  const [status, setStatus] = useState('agendada');
  const [observacoes, setObservacoes] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function carregarDados() {
      try {
        const [respostaConsulta, respostaPacientes, respostaProfissionais] =
          await Promise.all([
            api.get(`/consultas/${id}`),
            api.get('/pacientes'),
            api.get('/profissionais'),
          ]);

        const consulta = respostaConsulta.data;
        setPacientes(respostaPacientes.data);
        setProfissionais(respostaProfissionais.data);
        setPaciente(consulta.paciente?._id || consulta.paciente || '');
        setProfissional(
          consulta.profissional?._id || consulta.profissional || ''
        );
        setDataHora(formatarParaInput(consulta.dataHora));
        setStatus(consulta.status || 'agendada');
        setObservacoes(consulta.observacoes || '');
      } catch (erroRequisicao) {
        setErro(
          erroRequisicao.response?.data?.mensagem ||
            'Não foi possível carregar a consulta'
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, [id]);

  async function handleSubmit(event) {
    event.preventDefault();
    setErro('');

    const erroHorario = validarHorarioConsulta(dataHora);
    if (erroHorario) {
      setErro(erroHorario);
      return;
    }

    setSalvando(true);

    try {
      await api.put(`/consultas/${id}`, {
        paciente,
        profissional,
        dataHora: converterDataHoraParaApi(dataHora),
        status,
        observacoes,
      });
      navigate('/agenda');
    } catch (erroRequisicao) {
      setErro(
        erroRequisicao.response?.data?.mensagem ||
          'Não foi possível atualizar a consulta'
      );
    } finally {
      setSalvando(false);
    }
  }

  if (carregando) return <p>Carregando consulta...</p>;

  return (
    <>
      <CabecalhoPagina>
        <h1>Editar consulta</h1>
        <p>Atualize os dados do agendamento.</p>
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
            onChange={(event) => setProfissional(event.target.value)}
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
          <Label htmlFor="dataHora">Data e horário</Label>
          <Input
            id="dataHora"
            type="datetime-local"
            step={300}
            value={dataHora}
            onChange={(event) => setDataHora(event.target.value)}
            required
          />
          <TextoAjuda>
            Segunda a sexta, das 09:00 às 18:00. Almoço das 12:00 às 13:00.
            Cada consulta dura 1 hora.
          </TextoAjuda>
        </Campo>

        <Campo>
          <Label htmlFor="status">Status</Label>
          <Select
            id="status"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            required
          >
            <option value="agendada">Agendada</option>
            <option value="confirmada">Confirmada</option>
            <option value="concluida">Concluída</option>
          </Select>
        </Campo>

        <Campo $ocuparLinha>
          <Label htmlFor="observacoes">Observações</Label>
          <Textarea
            id="observacoes"
            value={observacoes}
            onChange={(event) => setObservacoes(event.target.value)}
            rows={5}
          />
        </Campo>

        <Acoes>
          <BotaoSalvar type="submit" disabled={salvando}>
            {salvando ? 'Salvando...' : 'Salvar alterações'}
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
