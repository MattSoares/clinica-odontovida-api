import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/api.js';
import { useAuth } from '../../contexts/AuthContext.jsx';
import {
  Cabecalho,
  GradeIndicadores,
  Indicador,
  RotuloIndicador,
  ValorIndicador,
  GradeConteudo,
  Painel,
  TituloPainel,
  ListaConsultas,
  Consulta,
  Status,
  EstadoVazio,
  Atalhos,
  Atalho,
  MensagemErro,
} from './styles.js';

function mesmaData(dataA, dataB) {
  return (
    dataA.getFullYear() === dataB.getFullYear() &&
    dataA.getMonth() === dataB.getMonth() &&
    dataA.getDate() === dataB.getDate()
  );
}

export default function Dashboard() {
  const [consultas, setConsultas] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [profissionais, setProfissionais] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const { usuario } = useAuth();

  const podeGerenciar = ['admin', 'recepcionista'].includes(usuario.papel);

  useEffect(() => {
    async function carregarDashboard() {
      try {
        const [respostaConsultas, respostaPacientes, respostaProfissionais] =
          await Promise.all([
            api.get('/consultas'),
            api.get('/pacientes'),
            api.get('/profissionais'),
          ]);
        setConsultas(respostaConsultas.data);
        setPacientes(respostaPacientes.data);
        setProfissionais(respostaProfissionais.data);
      } catch (erroRequisicao) {
        setErro(
          erroRequisicao.response?.data?.mensagem ||
            'Não foi possível carregar a dashboard'
        );
      } finally {
        setCarregando(false);
      }
    }
    carregarDashboard();
  }, []);

  const resumo = useMemo(() => {
    const agora = new Date();
    const ativas = consultas.filter((consulta) =>
      ['agendada', 'confirmada'].includes(consulta.status)
    );
    const hoje = ativas.filter((consulta) =>
      mesmaData(new Date(consulta.dataHora), agora)
    );
    const proximas = ativas
      .filter((consulta) => new Date(consulta.dataHora) >= agora)
      .sort((a, b) => new Date(a.dataHora) - new Date(b.dataHora))
      .slice(0, 5);

    return {
      hoje: hoje.length,
      agendadas: ativas.filter((consulta) => consulta.status === 'agendada').length,
      confirmadas: ativas.filter((consulta) => consulta.status === 'confirmada').length,
      proximas,
    };
  }, [consultas]);

  if (carregando) return <p>Carregando dashboard...</p>;

  return (
    <>
      <Cabecalho>
        <div>
          <h1>Olá, {usuario.nome}</h1>
          <p>Acompanhe o movimento da Clínica OdontoVida.</p>
        </div>
        <span>{usuario.papel}</span>
      </Cabecalho>

      {erro && <MensagemErro>{erro}</MensagemErro>}

      {!erro && (
        <>
          <GradeIndicadores>
            <Indicador $cor="#2563eb">
              <RotuloIndicador>Consultas hoje</RotuloIndicador>
              <ValorIndicador>{resumo.hoje}</ValorIndicador>
            </Indicador>
            <Indicador $cor="#7c3aed">
              <RotuloIndicador>Agendadas</RotuloIndicador>
              <ValorIndicador>{resumo.agendadas}</ValorIndicador>
            </Indicador>
            <Indicador $cor="#059669">
              <RotuloIndicador>Confirmadas</RotuloIndicador>
              <ValorIndicador>{resumo.confirmadas}</ValorIndicador>
            </Indicador>
            <Indicador $cor="#ea580c">
              <RotuloIndicador>Pacientes ativos</RotuloIndicador>
              <ValorIndicador>{pacientes.length}</ValorIndicador>
            </Indicador>
            <Indicador $cor="#0891b2">
              <RotuloIndicador>Profissionais</RotuloIndicador>
              <ValorIndicador>{profissionais.length}</ValorIndicador>
            </Indicador>
          </GradeIndicadores>

          <GradeConteudo>
            <Painel>
              <TituloPainel>
                <div>
                  <h2>Próximas consultas</h2>
                  <p>Os cinco próximos atendimentos ativos.</p>
                </div>
                <Link to="/agenda">Ver agenda</Link>
              </TituloPainel>

              {resumo.proximas.length === 0 ? (
                <EstadoVazio>Nenhuma consulta futura.</EstadoVazio>
              ) : (
                <ListaConsultas>
                  {resumo.proximas.map((consulta) => (
                    <Consulta key={consulta._id}>
                      <div>
                        <strong>{consulta.paciente?.nome || 'Paciente não encontrado'}</strong>
                        <span>{consulta.profissional?.nome || 'Profissional não encontrado'}</span>
                      </div>
                      <div>
                        <time>{new Date(consulta.dataHora).toLocaleString('pt-BR')}</time>
                        <Status $status={consulta.status}>{consulta.status}</Status>
                      </div>
                    </Consulta>
                  ))}
                </ListaConsultas>
              )}
            </Painel>

            <Painel>
              <TituloPainel>
                <div>
                  <h2>Acesso rápido</h2>
                  <p>Principais funções do sistema.</p>
                </div>
              </TituloPainel>
              <Atalhos>
                <Atalho as={Link} to="/agenda">Abrir agenda</Atalho>
                {podeGerenciar && <Atalho as={Link} to="/consultas/nova">Nova consulta</Atalho>}
                <Atalho as={Link} to="/pacientes">Pacientes</Atalho>
                <Atalho as={Link} to="/profissionais">Profissionais</Atalho>
                <Atalho as={Link} to="/historico">Histórico</Atalho>
                {podeGerenciar && <Atalho as={Link} to="/usuarios">Usuários</Atalho>}
              </Atalhos>
            </Painel>
          </GradeConteudo>
        </>
      )}
    </>
  );
}
