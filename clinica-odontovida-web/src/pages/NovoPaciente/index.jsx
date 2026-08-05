import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
} from './styles.js';

export default function NovoPaciente() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [historico, setHistorico] = useState('');

  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setErro('');
    setSalvando(true);

    try {
      await api.post('/pacientes', {
        nome,
        telefone,
        email: email || undefined,
        dataNascimento: dataNascimento || undefined,
        historico,
      });

      navigate('/pacientes');
    } catch (erroRequisicao) {
      setErro(
        erroRequisicao.response?.data?.mensagem ||
          'Não foi possível cadastrar o paciente'
      );
    } finally {
      setSalvando(false);
    }
  }

  return (
    <>
      <CabecalhoPagina>
        <h1>Novo paciente</h1>
        <p>Preencha os dados do paciente para realizar o cadastro.</p>
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
            placeholder="Digite o nome do paciente"
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
            placeholder="(00) 00000-0000"
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
            placeholder="paciente@email.com"
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
            placeholder="Informações importantes sobre o paciente"
            rows={5}
          />
        </Campo>

        <Acoes>
          <BotaoSalvar type="submit" disabled={salvando}>
            {salvando ? 'Salvando...' : 'Cadastrar paciente'}
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
