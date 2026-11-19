import { useState, type SyntheticEvent } from 'react'
import { Aviso } from '../components/FeedbackStates'
import FormField from '../components/FormField'
import PageTitle from '../components/PageTitle'
import { btnPrimary, campo } from '../components/ui'

type Erros = Partial<Record<'nome' | 'email' | 'assunto' | 'mensagem', string>>

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ContatoPage() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [assunto, setAssunto] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [erros, setErros] = useState<Erros>({})
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)

  async function enviar(evento: SyntheticEvent<HTMLFormElement>) {
    evento.preventDefault()

    const e: Erros = {}

    if (nome.trim().length < 3) {
      e.nome = 'Informe seu nome completo.'
    }

    if (!EMAIL.test(email.trim())) {
      e.email = 'Informe um e-mail válido, como nome@email.com.'
    }

    if (!assunto) {
      e.assunto = 'Escolha um assunto.'
    }

    if (mensagem.trim().length < 10) {
      e.mensagem = 'Escreva pelo menos 10 caracteres.'
    }

    setErros(e)
    setEnviado(false)

    if (Object.keys(e).length > 0) return

    setEnviando(true)
    await new Promise((resolver) => setTimeout(resolver, 800))
    setEnviando(false)
    setEnviado(true)
    setNome('')
    setEmail('')
    setAssunto('')
    setMensagem('')
  }

  const invalido = (k: keyof Erros) => (erros[k] ? true : undefined)

  return (
    <div className="space-y-8">
      <PageTitle
        titulo="Contato"
        subtitulo="Dúvidas, sugestões ou problemas com o app? Escreva para a gente."
      />

      <form onSubmit={enviar} noValidate className="grid max-w-2xl gap-5">
        <FormField id="nome" rotulo="Nome" erro={erros.nome}>
          <input
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            aria-invalid={invalido('nome')}
            className={campo}
            autoComplete="name"
          />
        </FormField>

        <FormField id="email" rotulo="E-mail" erro={erros.email}>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={invalido('email')}
            className={campo}
            autoComplete="email"
          />
        </FormField>

        <FormField id="assunto" rotulo="Assunto" erro={erros.assunto}>
          <select
            id="assunto"
            value={assunto}
            onChange={(e) => setAssunto(e.target.value)}
            aria-invalid={invalido('assunto')}
            className={campo}
          >
            <option value="">Selecione…</option>
            <option>Dúvida</option>
            <option>Sugestão</option>
            <option>Problema no app</option>
            <option>Parceria com a prefeitura</option>
          </select>
        </FormField>

        <FormField id="mensagem" rotulo="Mensagem" erro={erros.mensagem}>
          <textarea
            id="mensagem"
            rows={5}
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            aria-invalid={invalido('mensagem')}
            className={campo}
          />
        </FormField>

        {enviado && (
          <Aviso tipo="sucesso">
            Simulação concluída. Nenhuma mensagem foi enviada.
          </Aviso>
        )}

        <div>
          <button type="submit" disabled={enviando} className={btnPrimary}>
            {enviando ? 'Enviando…' : 'Enviar mensagem'}
          </button>
        </div>
      </form>
    </div>
  )
}