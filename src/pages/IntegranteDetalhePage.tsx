import { Link, useParams } from 'react-router'
import { EstadoVazio } from '../components/FeedbackStates'
import PageTitle from '../components/PageTitle'
import { btnOutline } from '../components/ui'
import { integrantes } from '../data/integrantes'

export default function IntegranteDetalhePage() {
  const { rm } = useParams()
  const integrante = integrantes.find((i) => i.rm === rm)

  if (!integrante) {
    return (
      <EstadoVazio
        titulo="Integrante não encontrado"
        texto={`Não existe integrante com o RM ${rm ?? ''}.`}
        acao={
          <Link to="/integrantes" className={btnOutline}>
            Voltar para integrantes
          </Link>
        }
      />
    )
  }

  return (
    <div className="space-y-6">
      <PageTitle titulo={integrante.nome} subtitulo={integrante.funcao} />

      <dl className="max-w-md divide-y divide-linha rounded-lg border border-linha bg-papel">
        <div className="flex justify-between gap-4 p-4">
          <dt className="text-suave">RM</dt>
          <dd className="font-semibold">{integrante.rm}</dd>
        </div>

        {integrante.github && (
          <div className="flex justify-between gap-4 p-4">
            <dt className="text-suave">GitHub</dt>
            <dd>
              <a
                className="font-semibold text-marinho hover:underline"
                href={integrante.github}
                target="_blank"
                rel="noreferrer"
              >
                Perfil
              </a>
            </dd>
          </div>
        )}

        {integrante.linkedin && (
          <div className="flex justify-between gap-4 p-4">
            <dt className="text-suave">LinkedIn</dt>
            <dd>
              <a
                className="font-semibold text-marinho hover:underline"
                href={integrante.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                Perfil
              </a>
            </dd>
          </div>
        )}
      </dl>

      <Link to="/integrantes" className={btnOutline}>
        Voltar para integrantes
      </Link>
    </div>
  )
}