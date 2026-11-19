import { Link } from 'react-router'
import type { Ocorrencia } from '../types'
import { formatarData, formatarEndereco, GRAVIDADE_LABEL } from '../utils/format'
import BotaoEuTambemVi from './BotaoEuTambemVi'
import StatusBadge from './StatusBadge'

const BORDA: Record<number, string> = {
  1: 'border-l-marinho',
  2: 'border-l-sinal',
  3: 'border-l-alerta',
}

interface Props {
  ocorrencia: Ocorrencia
  aoMudar: () => void
}

export default function OcorrenciaCard({ ocorrencia: o, aoMudar }: Props) {
  return (
    <article
      className={`flex flex-col rounded-lg border border-l-8 border-linha bg-papel p-5 ${
        BORDA[o.categoria.gravidade] ?? ''
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-semibold leading-snug">
          <Link
            to={`/ocorrencias/${o.idOcorrencia}`}
            className="hover:underline"
          >
            {o.categoria.nome}
          </Link>
        </h3>

        <StatusBadge status={o.status} />
      </div>

      <p className="mt-1 text-sm text-suave">{formatarEndereco(o)}</p>
      <p className="mt-3 line-clamp-3 text-sm">{o.descricao}</p>

      <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-xs text-suave">
        <div>
          <dt className="inline">Prioridade </dt>
          <dd className="inline font-bold text-tinta">{o.prioridade}</dd>
        </div>

        <div>
          <dt className="inline">Gravidade </dt>
          <dd className="inline font-bold text-tinta">
            {GRAVIDADE_LABEL[o.categoria.gravidade] ?? o.categoria.gravidade}
          </dd>
        </div>

        <div>
          <dt className="inline">Confirmações </dt>
          <dd className="inline font-bold text-tinta">{o.qtdConfirmacoes}</dd>
        </div>

        <div>
          <dt className="inline">Aberta em </dt>
          <dd className="inline">{formatarData(o.dataAbertura)}</dd>
        </div>
      </dl>

      <div className="mt-5 flex flex-wrap items-start gap-3">
        <BotaoEuTambemVi ocorrencia={o} aoMudar={aoMudar} />

        <Link
          to={`/ocorrencias/${o.idOcorrencia}`}
          className="inline-flex items-center rounded-md px-3 py-2.5 text-sm font-semibold text-marinho hover:underline"
        >
          Ver andamento
        </Link>
      </div>
    </article>
  )
}