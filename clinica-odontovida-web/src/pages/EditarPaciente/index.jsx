import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/api.js';
import { formatarTelefone } from '../../utils/formatadores.js';
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
} from '../NovoPaciente/styles.js';

export default function EditarPaciente() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [historico, setHistorico] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function carregarPaciente() {
      try {
        const resposta = await api.get(`/pacientes/${id}`);
        const paciente = resposta.data;

        setNome(paciente.nome || '');
        setTelefone(formatarTelefone(paciente.telefone));
        setEmail(paciente.email || '');
        setHistorico(paciente.historico || '');
        setDataNascimento(
          paciente.dataNascimento
            ? paciente.dataNascimento.slice(0, 10)
            : ''
        );
      } catch (erroRequisicao) {
        setErro(
          erroRequisicao.response?.data?.mensagem ||
            'Não foi possível carregar o paciente'
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarPaciente();
  }, [id]);

  async function handleSubmit(event) {
    event.preventDefault();
    setErro('');
    setSalvando(true);

    try {
      await api.put(`/pacientes/${id}`, {
        nome,
        telefone,
        email: email || undefined,
        dataNascimento: dataNascimento || null,
        historico,
      });

      navigate('/pacientes');
    } catch (erroRequisicao) {
      setErro(
        erroRequisicao.response?.data?.mensagem ||
          'Não foi possível atualizar o paciente'
      );
    } finally {
      setSalvando(false);
    }
  }

  if (carregando) {
    return <p>Carregando paciente...</p>;
  }

  return (
    <>
      <CabecalhoPagina>
        <h1>Editar paciente</h1>
        <p>Atualize os dados cadastrais do paciente.</p>
      </CabecalhoPagina>

      {erro && <MensagemErro>{erro}</MensagemErro>}

      <Formulario onSubmit={handleSubmit}>
        <Campo>
          <Label htmlFor="nome">Nome completo</Label>
          <Input
            id="nome"
            type="text"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            required
          />
        </Campo>

        <Campo>
          <Label htmlFor="telefone">Telefone</Label>
          <Input
            id="telefone"
            type="tel"
            inputMode="numeric"
            maxLength={15}
            pattern="\([0-9]{2}\) [0-9]{4,5}-[0-9]{4}"
            title="Informe o telefone no formato (00) 00000-0000"
            value={telefone}
            onChange={(event) =>
              setTelefone(formatarTelefone(event.target.value))
            }
            required
          />
        </Campo>

        <Campo>
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Campo>

        <Campo>
          <Label htmlFor="dataNascimento">Data de nascimento</Label>
          <Input
            id="dataNascimento"
            type="date"
            value={dataNascimento}
            onChange={(event) => setDataNascimento(event.target.value)}
          />
        </Campo>

        <Campo $ocuparLinha>
          <Label htmlFor="historico">Histórico e observações</Label>
          <Textarea
            id="historico"
            value={historico}
            onChange={(event) => setHistorico(event.target.value)}
            rows={5}
          />
        </Campo>

        <Acoes>
          <BotaoSalvar type="submit" disabled={salvando}>
            {salvando ? 'Salvando...' : 'Salvar alterações'}
          </BotaoSalvar>

          <BotaoCancelar
            type="button"
            onClick={() => navigate('/pacientes')}
            disabled={salvando}
          >
            Cancelar
          </BotaoCancelar>
        </Acoes>
      </Formulario>
    </>
  );
}
