import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login/index.jsx';
import Agenda from '../pages/Agenda/index.jsx';
import NovaConsulta from '../pages/NovaConsulta/index.jsx';
import Layout from '../components/Layout/index.jsx';
import RotaProtegida from './RotaProtegida.jsx';
import RotaPorPapel from './RotaPorPapel.jsx';
import Pacientes from '../pages/Pacientes/index.jsx';
import NovoPaciente from '../pages/NovoPaciente/index.jsx';
import EditarPaciente from '../pages/EditarPaciente/index.jsx';
import Profissionais from '../pages/Profissionais/index.jsx';
import NovoProfissional from '../pages/NovoProfissional/index.jsx';
import EditarProfissional from '../pages/EditarProfissional/index.jsx';
import EditarConsulta from '../pages/EditarConsulta/index.jsx';
import HistoricoConsultas from '../pages/HistoricoConsultas/index.jsx';
import Usuarios from '../pages/Usuarios/index.jsx';
import NovoUsuario from '../pages/NovoUsuario/index.jsx';
import EditarUsuario from '../pages/EditarUsuario/index.jsx';
import Dashboard from '../pages/Dashboard/index.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <RotaProtegida>
            <Layout>
              <Dashboard />
            </Layout>
          </RotaProtegida>
        }
      />

      <Route
        path="/agenda"
        element={
          <RotaProtegida>
            <Layout><Agenda /></Layout>
          </RotaProtegida>
        }
      />

      <Route
        path="/pacientes"
        element={
          <RotaProtegida>
            <Layout>
              <Pacientes />
            </Layout>
          </RotaProtegida>
        }
      />

      <Route
        path="/pacientes/novo"
        element={
          <RotaPorPapel papeisPermitidos={['admin', 'recepcionista']}>
            <Layout>
              <NovoPaciente />
            </Layout>
          </RotaPorPapel>
        }
      />

      <Route
        path="/pacientes/:id/editar"
        element={
          <RotaPorPapel papeisPermitidos={['admin', 'recepcionista']}>
            <Layout>
              <EditarPaciente />
            </Layout>
          </RotaPorPapel>
        }
      />

      <Route
        path="/profissionais"
        element={
          <RotaProtegida>
            <Layout>
              <Profissionais />
            </Layout>
          </RotaProtegida>
        }
      />

      <Route
        path="/profissionais/novo"
        element={
          <RotaPorPapel papeisPermitidos={['admin', 'recepcionista']}>
            <Layout>
              <NovoProfissional />
            </Layout>
          </RotaPorPapel>
        }
      />

      <Route
        path="/profissionais/:id/editar"
        element={
          <RotaPorPapel papeisPermitidos={['admin', 'recepcionista']}>
            <Layout>
              <EditarProfissional />
            </Layout>
          </RotaPorPapel>
        }
      />

      <Route
        path="/consultas/nova"
        element={
          <RotaPorPapel papeisPermitidos={['admin', 'recepcionista']}>
            <Layout>
              <NovaConsulta />
            </Layout>
          </RotaPorPapel>
        }
      />

      <Route
        path="/consultas/:id/editar"
        element={
          <RotaPorPapel papeisPermitidos={['admin', 'recepcionista']}>
            <Layout>
              <EditarConsulta />
            </Layout>
          </RotaPorPapel>
        }
      />

      <Route
        path="/historico"
        element={
          <RotaProtegida>
            <Layout>
              <HistoricoConsultas />
            </Layout>
          </RotaProtegida>
        }
      />

      <Route
        path="/usuarios"
        element={
          <RotaPorPapel papeisPermitidos={['admin', 'recepcionista']}>
            <Layout><Usuarios /></Layout>
          </RotaPorPapel>
        }
      />

      <Route
        path="/usuarios/novo"
        element={
          <RotaPorPapel papeisPermitidos={['admin', 'recepcionista']}>
            <Layout><NovoUsuario /></Layout>
          </RotaPorPapel>
        }
      />

      <Route
        path="/usuarios/:id/editar"
        element={
          <RotaPorPapel papeisPermitidos={['admin', 'recepcionista']}>
            <Layout><EditarUsuario /></Layout>
          </RotaPorPapel>
        }
      />
    </Routes>
  );
}
