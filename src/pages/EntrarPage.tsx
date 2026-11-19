import { useState, type SyntheticEvent } from 'react'
import { useNavigate } from 'react-router'
import { Aviso } from '../components/FeedbackStates'
import FormField from '../components/FormField'
import PageTitle from '../components/PageTitle'
import { btnPrimary, campo } from '../components/ui'
import { useAuth } from '../context/useAuth'
import { mensagemErro } from '../services/api'
import { cadastrarUsuario, entrarComEmail } from '../services/usuarioService'

type Modo = 'entrar' | 'cadastrar'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function EntrarPage() {
  const { entrar } = useAuth()
  const navigate = useNavigate()
  const [modo, setModo] = useState<Modo>('entrar')
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [erros, setErros] = useState<{ nome?: string; email?: string }>({})
  const [erroApi, setErroApi] = useState<string | null>(null)
  const [enviando, setEnviando] = useState(false)

  function trocarModo(novo: Modo) {
    setModo(novo)
    setErros({})
    setErroApi(null)
  }

  async function enviar(evento: SyntheticEvent<HTMLFormElement>) {
    evento.preventDefault()

    const e: { nome?: string; email?: string } = {}

    if (modo === 'cadastrar' && (!nome.trim() || nome.length > 100)) {
      e.nome = 'Informe seu nome (até 100 caracteres).'
    }

    if (!EMAIL.test(email.trim())) {
      e.email = 'Informe um e-mail válido, como nome@email.com.'
    }

    setErros(e)
    setErroApi(null)

    if (Object.keys(e).length > 0) return

    setEnviando(true)

    try {
      const usuario =
        modo === 'entrar'
          ? await entrarComEmail(email.trim())
          : await cadastrarUsuario(nome.trim(), email.trim())

      entrar(usuario)
      navigate('/ocorrencias')
    } catch (err) {
      setErroApi(mensagemErro(err))
    } finally {
      setEnviando(false)
    }
  }

  const abas =
    'flex-1 rounded-md px-4 py-2.5 text-sm font-semibold transition-colors'

  return (
    <div className="mx-auto max-w-md space-y-6">
      <PageTitle
        titulo={modo === 'entrar' ? 'Entrar' : 'Criar conta'}
        subtitulo="Use seu e-mail para registrar problemas e confirmar os dos vizinhos."
      />

      <div
        role="group"
        aria-label="Escolha entre entrar e criar conta"
        className="flex gap-1 rounded-lg bg-linha/60 p-1"
      >
        <button
          type="button"
          aria-pressed={modo === 'entrar'}
          onClick={() => trocarModo('entrar')}
          className={`${abas} ${
            modo === 'entrar' ? 'bg-papel shadow-sm' : 'text-suave'
          }`}
        >
          Já tenho conta
        </button>

        <button
          type="button"
          aria-pressed={modo === 'cadastrar'}
          onClick={() => trocarModo('cadastrar')}
          className={`${abas} ${
            modo === 'cadastrar' ? 'bg-papel shadow-sm' : 'text-suave'
          }`}
        >
          Criar conta
        </button>
      </div>

      <form onSubmit={enviar} noValidate className="grid gap-5">
        {modo === 'cadastrar' && (
          <FormField id="nome" rotulo="Nome" erro={erros.nome}>
            <input
              id="nome"
              value={nome}
              onChange={(ev) => setNome(ev.target.value)}
              aria-invalid={erros.nome ? true : undefined}
              className={campo}
              autoComplete="name"
            />
          </FormField>
        )}

        <FormField id="email" rotulo="E-mail" erro={erros.email}>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            aria-invalid={erros.email ? true : undefined}
            className={campo}
            autoComplete="email"
          />
        </FormField>

        {erroApi && <Aviso tipo="erro">{erroApi}</Aviso>}

        <button type="submit" disabled={enviando} className={btnPrimary}>
          {enviando ? 'Aguarde…' : modo === 'entrar' ? 'Entrar' : 'Criar conta'}
        </button>
      </form>
    </div>
  )
}