import { Link } from 'react-router'
import { EstadoVazio } from '../components/FeedbackStates'
import { btnPrimary } from '../components/ui'

export default function NaoEncontradaPage() {
  return (
    <EstadoVazio
      titulo="Página não encontrada"
      texto="O endereço que você abriu não existe. Volte para o início ou veja as ocorrências."
      acao={<Link to="/" className={btnPrimary}>Ir para o início</Link>}
    />
  )
}
