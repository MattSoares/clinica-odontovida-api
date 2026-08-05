import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function RotaPorPapel({ papeisPermitidos, children }) {
  const { usuario, carregando } = useAuth();

  if (carregando) {
    return <p>Carregando...</p>;
  }

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (!papeisPermitidos.includes(usuario.papel)) {
    return <Navigate to="/" replace />;
  }

  return children;
}