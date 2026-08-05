import { useEffect } from 'react';
import {
  Fundo,
  Card,
  Icone,
  Titulo,
  Mensagem,
  Acoes,
  BotaoVoltar,
  BotaoConfirmar,
} from './styles.js';

export default function ModalConfirmacao({
  aberto,
  titulo,
  mensagem,
  textoConfirmar = 'Confirmar',
  carregando = false,
  onConfirmar,
  onCancelar,
}) {
  useEffect(() => {
    function fecharComEscape(event) {
      if (event.key === 'Escape' && aberto && !carregando) {
        onCancelar();
      }
    }

    document.addEventListener('keydown', fecharComEscape);
    return () => document.removeEventListener('keydown', fecharComEscape);
  }, [aberto, carregando, onCancelar]);

  if (!aberto) return null;

  return (
    <Fundo onMouseDown={carregando ? undefined : onCancelar}>
      <Card
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="titulo-confirmacao"
        aria-describedby="mensagem-confirmacao"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <Icone aria-hidden="true">!</Icone>
        <Titulo id="titulo-confirmacao">{titulo}</Titulo>
        <Mensagem id="mensagem-confirmacao">{mensagem}</Mensagem>

        <Acoes>
          <BotaoVoltar
            type="button"
            onClick={onCancelar}
            disabled={carregando}
          >
            Voltar
          </BotaoVoltar>
          <BotaoConfirmar
            type="button"
            onClick={onConfirmar}
            disabled={carregando}
          >
            {carregando ? 'Aguarde...' : textoConfirmar}
          </BotaoConfirmar>
        </Acoes>
      </Card>
    </Fundo>
  );
}
