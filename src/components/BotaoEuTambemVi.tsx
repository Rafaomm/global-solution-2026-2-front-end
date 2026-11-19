import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { useAuth } from '../context/useAuth'
import { ApiError, mensagemErro } from '../services/api'
import {
  confirmarOcorrencia,
  removerConfirmacao,
} from '../services/ocorrenciaService'
import type { Ocorrencia } from '../types'
import { estaEncerrada } from '../utils/format'
import { lerConfirmados, salvarConfirmado } from '../utils/confirmados'
import { btnDark, btnOutline, btnPrimary } from './ui'

interface Props {
  ocorrencia: Ocorrencia
  aoMudar: () => void
}

export default function BotaoEuTambemVi({ ocorrencia, aoMudar }: Props) {
  const { usuario } = useAuth()
  const [confirmado, setConfirmado] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  useEffect(() => {
    setConfirmado(
      usuario
        ? lerConfirmados(usuario.idUsuario).includes(ocorrencia.idOcorrencia)
        : false,
    )
  }, [usuario, ocorrencia.idOcorrencia])

  if (!usuario) {
    return (
      <Link to="/entrar" className={btnOutline}>
        Entre para confirmar
      </Link>
    )
  }

  if (usuario.idUsuario === ocorrencia.idUsuario) {
    return (
      <button type="button" disabled className={btnOutline}>
        Sua ocorrência
      </button>
    )
  }

  if (estaEncerrada(ocorrencia.status)) {
    return (
      <button type="button" disabled className={btnOutline}>
        Encerrada
      </button>
    )
  }

  if (usuario.perfil === 'PREFEITURA') return null

  async function alternar() {
    if (!usuario) return

    setEnviando(true)
    setErro(null)

    try {
      if (confirmado) {
        await removerConfirmacao(ocorrencia.idOcorrencia, usuario.idUsuario)
        salvarConfirmado(usuario.idUsuario, ocorrencia.idOcorrencia, false)
        setConfirmado(false)
      } else {
        await confirmarOcorrencia(ocorrencia.idOcorrencia, usuario.idUsuario)
        salvarConfirmado(usuario.idUsuario, ocorrencia.idOcorrencia, true)
        setConfirmado(true)
      }

      aoMudar()
    } catch (e) {
      if (e instanceof ApiError && e.status === 409) {
        salvarConfirmado(usuario.idUsuario, ocorrencia.idOcorrencia, true)
        setConfirmado(true)
      }

      setErro(mensagemErro(e))
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={alternar}
        disabled={enviando}
        aria-pressed={confirmado}
        className={confirmado ? btnDark : btnPrimary}
      >
        {enviando
          ? 'Enviando…'
          : confirmado
            ? 'Você viu · desfazer'
            : 'Eu também vi'}
      </button>

      {erro && (
        <p role="alert" className="mt-1.5 text-xs font-medium text-alerta">
          {erro}
        </p>
      )}
    </div>
  )
}