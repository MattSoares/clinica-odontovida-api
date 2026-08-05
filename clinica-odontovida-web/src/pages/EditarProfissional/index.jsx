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
  MensagemErro,
  Acoes,
  BotaoSalvar,
  BotaoCancelar,
} from '../NovoPaciente/styles.js';

export default function EditarProfissional() {
  const [nome, setNome] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [telefone, setTelefone] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function carregarProfissional() {
      try {
        const resposta = await api.get(`/profissionais/${id}`);
        const profissional = resposta.data;

        setNome(profissional.nome || '');
        setEspecialidade(profissional.especialidade || '');
        setTelefone(formatarTelefone(profissional.telefone));
      } catch (erroRequisicao) {
        setErro(
          erroRequisicao.response?.data?.mensagem ||
            'Não foi possível carregar o profissional'
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarProfissional();
  }, [id]);

  async function handleSubmit(event) {
    event.preventDefault();
    setErro('');
    setSalvando(true);

    try {
      await api.put(`/profissionais/${id}`, {
        nome,
        especialidade,
        telefone: telefone || undefined,
      });

      navigate('/profissionais');
    } catch (erroRequisicao) {
      setErro(
        erroRequisicao.response?.data?.mensagem ||
          'Não foi possível atualizar o profissional'
      );
    } finally {
      setSalvando(false);
    }
  }

  if (carregando) {
    return <p>Carregando profissional...</p>;
  }

  return (
    <>
      <CabecalhoPagina>
        <h1>Editar profissional</h1>
        <p>Atualize os dados cadastrais do profissional.</p>
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
          <Label htmlFor="especialidade">Especialidade</Label>
          <Input
            id="especialidade"
            type="text"
            value={especialidade}
            onChange={(event) => setEspecialidade(event.target.value)}
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
            {salvando ? 'Salvando...' : 'Salvar alterações'}
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
