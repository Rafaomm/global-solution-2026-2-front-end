import { Link } from 'react-router'
import { Carregando, ErroMensagem, EstadoVazio } from '../components/FeedbackStates'
import PageTitle from '../components/PageTitle'
import StatusBadge from '../components/StatusBadge'
import { useFetch } from '../hooks/useFetch'
import { rankingBairros } from '../services/catalogoService'
import { listarOcorrencias } from '../services/ocorrenciaService'
import { estaEncerrada, formatarEndereco } from '../utils/format'

function Indicador({ rotulo, valor }: { rotulo: string; valor: string | number }) {
    return (
        <div className="rounded-lg border border-linha bg-papel p-5">
            <dt className="text-sm text-suave">{rotulo}</dt>
            <dd className="mt-1 font-display text-4xl font-extrabold">{valor}</dd>
        </div>
    )
}

export default function PainelPage() {
    const ranking = useFetch(rankingBairros, [])
    const ocorrencias = useFetch(() => listarOcorrencias('', 'prioridade'), [])

    const todas = ocorrencias.dados ?? []
    const emAberto = todas.filter((o) => !estaEncerrada(o.status))
    const resolvidas = todas.filter((o) => o.status === 'RESOLVIDA').length
    const taxa = todas.length ? Math.round((resolvidas / todas.length) * 100) : 0
    const maiorTotal = Math.max(1, ...(ranking.dados ?? []).map((b) => b.totalOcorrencias))

    return (
        <div className="space-y-10">
            <PageTitle titulo="Painel da prefeitura" subtitulo="O que resolver primeiro e quais bairros concentram mais problemas."/>

            <section aria-label="Indicadores">
                {ocorrencias.carregando && <Carregando texto="Calculando indicadores… o servidor pode levar alguns segundos na primeira visita."/>}
                {ocorrencias.erro && <ErroMensagem mensagem={ocorrencias.erro} aoTentar={ocorrencias.recarregar} />}
                {ocorrencias.dados && (
                <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    <Indicador rotulo="Ocorrências registradas" valor={todas.length} />
                    <Indicador rotulo="Em aberto" valor={emAberto.length} />
                    <Indicador rotulo="Resolvidas" valor={resolvidas} />
                    <Indicador rotulo="Taxa de resolução" valor={`${taxa}%`} />
                </dl>
                )}

            </section>

            <div className="grid gap-10 lg:grid-cols-2">
            <section aria-labelledby="fila">
            <h2 id="fila" className="font-display text-2xl font-extrabold">Fila de prioridade</h2>
            <p className="mt-1 text-sm text-suave">Ocorrências em aberto, da maior para a menor prioridade.</p>
            
            {ocorrencias.carregando && <Carregando />}
            {ocorrencias.dados && emAberto.length === 0 && (
                <div className="mt-4"><EstadoVazio titulo="Fila vazia" texto="Não há ocorrências em aberto no momento." /></div>
            )}

            {emAberto.length > 0 && (
                <ol className="mt-4 divide-y divide-linha rounded-lg border border-linha bg-papel">
                {emAberto.slice(0, 8).map((o) => (
                    <li key={o.idOcorrencia}>
                    <Link to={`/ocorrencias/${o.idOcorrencia}`} className="flex items-center gap-4 p-4 hover:bg-white">
                        <span className="grid size-12 shrink-0 place-items-center rounded-md bg-asfalto font-display text-xl font-extrabold text-sinal" aria-label={`Prioridade ${o.prioridade}`}>{o.prioridade}</span>
                        <span className="min-w-0 flex-1">
                        <span className="block truncate font-semibold">{o.categoria.nome}</span>
                        <span className="block truncate text-sm text-suave">{formatarEndereco(o)}</span>
                        </span>
                        <span className="hidden shrink-0 text-right text-xs text-suave sm:block">
                        <StatusBadge status={o.status} />
                        <span className="mt-1 block">{o.qtdConfirmacoes} confirmações</span>
                        </span>
                    </Link>
                    </li>
                ))}
                </ol>
            )}
            </section>

            <section aria-labelledby="bairros">
            <h2 id="bairros" className="font-display text-2xl font-extrabold">Bairros com mais problemas</h2>
            <p className="mt-1 text-sm text-suave">Total de ocorrências por bairro; a parte escura ainda está em aberto.</p>
            
            {ranking.carregando && <Carregando />}
            {ranking.erro && <div className="mt-4"><ErroMensagem mensagem={ranking.erro} aoTentar={ranking.recarregar} /></div>}
            {ranking.dados && ranking.dados.length === 0 && (
                <div className="mt-4"><EstadoVazio titulo="Sem dados por bairro" texto="Nenhum bairro cadastrado." /></div>
            )}

            {ranking.dados && ranking.dados.length > 0 && (
                <ul className="mt-4 space-y-4 rounded-lg border border-linha bg-papel p-5">
                {ranking.dados.map((b) => (
                    <li key={b.idBairro}>
                        <div className="flex justify-between gap-3 text-sm">
                            <span className="font-semibold">{b.nome}</span>
                            <span className="text-suave">{b.totalAbertas} em aberto · {b.totalOcorrencias} no total</span>
                        </div>
                        
                        <div className="mt-1.5 h-3 overflow-hidden rounded-full bg-linha" role="img" aria-label={`${b.nome}: ${b.totalOcorrencias} ocorrências, ${b.totalAbertas} em aberto`}>
                            <div className="relative h-full rounded-full bg-sinal" style={{ width: `${(b.totalOcorrencias / maiorTotal) * 100}%` }}>
                            <div className="h-full rounded-full bg-asfalto" style={{ width: b.totalOcorrencias ? `${(b.totalAbertas / b.totalOcorrencias) * 100}%` : '0%' }} />
                            </div>
                        </div>
                    </li>
                ))}
                </ul>
            )}
            </section>
         </div>
    </div>
  )
}