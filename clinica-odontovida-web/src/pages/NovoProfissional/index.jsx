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
  MensagemErro,
  Acoes,
  BotaoSalvar,
  BotaoCancelar,
} from '../NovoPaciente/styles.js';

export default function NovoProfissional() {
  const [nome, setNome] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [telefone, setTelefone] = useState('');
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setErro('');
    setSalvando(true);

    try {
      await api.post('/profissionais', {
        nome,
        especialidade,
        telefone: telefone || undefined,
      });

      navigate('/profissionais');
    } catch (erroRequisicao) {
      setErro(
        erroRequisicao.response?.data?.mensagem ||
          'Não foi possível cadastrar o profissional'
      );
    } finally {
      setSalvando(false);
    }
  }

  return (
    <>
      <CabecalhoPagina>
        <h1>Novo profissional</h1>
        <p>Preencha os dados do profissional para realizar o cadastro.</p>
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
            placeholder="Digite o nome do profissional"
            required
          />
        </Campo>

        <Campo>
          <Label htmlFor="especialidade">Especialidade</Label>
          <Input
            id="especialidade"
            type="text"
            value={especialidade}
            onChange={(event) => setEspecialidade(event.target.value)}
            placeholder="Ex.: Ortodontia"
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
          />
        </Campo>

        <Acoes>
          <BotaoSalvar type="submit" disabled={salvando}>
            {salvando ? 'Salvando...' : 'Cadastrar profissional'}
          </BotaoSalvar>

          <BotaoCancelar
            type="button"
            onClick={() => navigate('/profissionais')}
            disabled={salvando}
          >
            Cancelar
          </BotaoCancelar>
        </Acoes>
      </Formulario>
    </>
  );
}
