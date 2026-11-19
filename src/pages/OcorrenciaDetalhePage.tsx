import { useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router'; 
import BotaoEuTambemVi from '../components/BotaoEuTambemVi';
import { Aviso, Carregando, ErroMensagem } from '../components/FeedbackStates';
import PageTitle from '../components/PageTitle';
import StatusBadge from '../components/StatusBadge';
import StatusUpdateForm from '../components/StatusUpdateForm'; 
import { btnDanger, btnOutline } from '../components/ui';
import { useAuth } from '../context/useAuth'; 
import { useFetch } from '../hooks/useFetch';
import { mensagemErro } from '../services/api';
import { buscarOcorrencia, excluirOcorrencia, listarHistorico } from '../services/ocorrenciaService'; 
import { estaEncerrada, formatarData, formatarEndereco, GRAVIDADE_LABEL, STATUS_LABEL, TRANSICOES } from '../utils/format';

export default function OcorrenciaDetalhePage(){
    const { id } = useParams()
    const idOcorrencia = Number(id)
    const avisoInicial = (useLocation().state as { aviso?: string } | null) ?.aviso
    const navigate = useNavigate()
    const { usuario } = useAuth()
    const [erroExclusao, setErroExclusao] = useState<string | null>(null)
    const [excluindo, setExcluindo] = useState(false)

    const carga = useFetch(async () => {
        const [ocorrencia, historico] = await 
        Promise.all([buscarOcorrencia(idOcorrencia), listarHistorico(idOcorrencia)])
        return { ocorrencia, historico }
    }, [idOcorrencia])

    if (carga.carregando && !carga.dados) return <Carregando texto="Carregando ocorrência…"/>
    if (carga.erro || !carga.dados) {
        return (
            <div className="space-y-4">
                    <ErroMensagem mensagem={carga.erro ?? 'Ocorrência indisponível.'} aoTentar={carga.recarregar}/>
                    <Link to="/ocorrencias" className={btnOutline}>Voltar para ocorrências</Link>
            </div>
        )
    }

    const { ocorrencia: o, historico } = carga.dados
    const ehAutor = usuario?.idUsuario === o.idUsuario
    const ehPrefeitura = usuario?.perfil === 'PREFEITURA'
    const opcoesStatus = ehPrefeitura ? TRANSICOES[o.status] : ehAutor && o.status === 'ABERTA' ? (['CANCELADA'] as const): []
    const podeEditar = ehAutor && !estaEncerrada(o.status)
    const podeExcluir = ehAutor && o.status === 'ABERTA' && o.qtdConfirmacoes === 0

    async function excluir() {
        if (!usuario || !window.confirm('Excluir esta ocorrência? Essa ação não pode ser desfeita.')) return
        setExcluindo(true)
        setErroExclusao(null)
        try {
            await excluirOcorrencia(idOcorrencia, usuario.idUsuario)
            navigate('/ocorrencias', { state: { aviso: 'Ocorrência excluída.'} })
        } catch (e) {
            setErroExclusao(mensagemErro(e))
            setExcluindo(false)
        }
    }

    return (
        <div className="space-y-8">
            <PageTitle titulo={o.categoria.nome} subtitulo={formatarEndereco(o)} 
            acao={<StatusBadge status={o.status}/>}/>
            {avisoInicial && <Aviso tipo="sucesso">{avisoInicial}</Aviso>}

            <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
                <section className="space-y-6">
                    <div className="rounded-lg border border-linha bg-papel p-6">
                        <h2 className="font-display text-lg font-semibold">Relato</h2>
                        <p className="mt-2 whitespace-pre-line">{o.descricao}</p>
                        {o.referencia && <p className="mt-3 text-sm text-suave">Referência: {o.referencia}</p>}
                        <dl className="mt-5 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
                            <div><dt className="text-suave">Prioridade</dt><dd 
                            className="font-display text-2xl font-extrabold">{o.prioridade}</dd></div>
                            <div><dt className="text-suave">Confirmações</dt><dd 
                            className="font-display text-2xl font-extrabold">{o.qtdConfirmacoes}</dd></div>
                            <div><dt className="text-suave">Gravidade</dt><dd 
                            className="font-semibold">{GRAVIDADE_LABEL[o.categoria.gravidade] ?? o.categoria.gravidade}</dd>
                            </div>
                            <div><dt className="text-suave">Aberta em</dt><dd 
                            className="font-semibold">{formatarData(o.dataAbertura)}</dd></div>
                        </dl>
                        {o.dataResolucao && <p className="mt-4 text-sm font-semibold text-ok">Resolvida em {formatarData(o.dataResolucao)}</p>}
                    </div>

                    <div className="flex flex-wrap items-start gap-3">
                        <BotaoEuTambemVi ocorrencia={o} aoMudar={carga.recarregar}/>
                        {podeEditar && <Link to={`/ocorrencias/${o.idOcorrencia}/editar`}
                        className={btnOutline}>Editar</Link>}
                        {podeExcluir && <button type="button" onClick={excluir} 
                        disabled={excluindo} className={btnDanger}>{excluindo ? 'Excluindo…' : 'Excluir'}</button>}
                    </div>
                    {erroExclusao && <Aviso tipo="erro">{erroExclusao}</Aviso>}

                    {usuario && opcoesStatus.length > 0 && (
                        <div className="rounded-lg border border-linha bg-papel p-6">
                            <h2 className="font-display text-lg font-semibold">{ehPrefeitura ? 
                            'Atualizar andamento' : 'Cancelar ocorrência'}</h2>
                            <div className="mt-4">
                                <StatusUpdateForm key={o.status} idOcorrencia={o.idOcorrencia} 
                                idUsuario={usuario.idUsuario} opcoes={[...opcoesStatus]} 
                                aoConcluir={carga.recarregar}/>
                            </div>
                        </div>
                    )}
                </section>

                <section aria-labelledby="historico">
                    <h2 id="historico" className="font-display text-lg font-semibold">Andamento</h2>
                    {historico.length === 0 ? (
                        <p className="mt-3 text-sm text-suave">Ainda não há registros de andamento.</p>
                        ) : (
                            <ol className="mt-4 space-y-5 border-l-2 border-linha pl-5">
                                {historico.map((h) => (
                                    <li key={h.idHistorico} className="relative">
                                        <span className="absolute -left-[1.62rem] top-1.5 size-3 rounded-full bg-sinal ring-4 ring-concreto" 
                                        aria-hidden="true"/>
                                        <p className="font-semibold">
                                            {STATUS_LABEL[h.statusNovo]}
                                            {h.statusAnterior && <span className="font-normal text-suave"> · 
                                                antes: {STATUS_LABEL[h.statusAnterior]}</span>}
                                        </p>
                                        <p className="text-sm">{h.observacao}</p>
                                        <p className="text-xs text-suave">{formatarData(h.dataAlteracao)}</p>
                                    </li>
                                ))}
                            </ol>
                         )}
                </section>
            </div>
        </div>
    )
}


