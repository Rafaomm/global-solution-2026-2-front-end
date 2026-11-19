import { useState, type SyntheticEvent } from 'react'; 
import { mensagemErro } from '../services/api';
import { alterarStatus } from '../services/ocorrenciaService'; 
import type { StatusOcorrencia } from '../types';
import { STATUS_LABEL } from '../utils/format';
import { Aviso } from './FeedbackStates';
import FormField from './FormField';
import { btnDark, campo } from './ui';

interface Props {
    idOcorrencia: number
    idUsuario: number
    opcoes: StatusOcorrencia[]
    aoConcluir: () => void
}

export default function StatusUpdateForm({ idOcorrencia, idUsuario, opcoes, aoConcluir }: Props) {
    const [escolhido, setEscolhido] = useState<StatusOcorrencia | ''>('')

    const novoStatus = opcoes.includes(escolhido as StatusOcorrencia) ? escolhido : (opcoes[0] ?? '')
    const [observacao, setObservacao] = useState('')
    const [erroCampo, setErroCampo] = useState<string | null>(null)
    const [erroApi, setErroApi] = useState<string | null>(null)
    const [enviando, setEnviando] = useState(false)

    async function enviar(evento: SyntheticEvent<HTMLFormElement>) {
        evento.preventDefault()
        setErroApi(null)
        if (!observacao.trim()) return setErroCampo('Explique o motivo da mudança.')
        if (observacao.length > 250) return setErroCampo('Use no máximo 250 caracteres.')
        setErroCampo(null)
        if (!novoStatus) return

        setEnviando(true)
        try {
            await alterarStatus(idOcorrencia, { idUsuario, statusNovo: novoStatus, observacao: observacao.trim() })
            setObservacao('')
            aoConcluir()
        } catch (e) {
            setErroApi(mensagemErro(e))
        } finally {
            setEnviando(false)
        }
    }

    return (
        <form onSubmit={enviar} noValidate className="grid gap-4">
            <FormField id="novo-status" rotulo="Novo status">
                <select id="novo-status" value={novoStatus} onChange={(e) =>
                    setEscolhido(e.target.value as StatusOcorrencia)} className={campo}>
                        {opcoes.map((s) => (
                            <option key={s} value={s}>
                                {STATUS_LABEL[s]}
                            </option>
                        ))}
                    </select>
            </FormField>

            <FormField id="observacao" rotulo="Observação" erro={erroCampo ?? undefined}
                dica={`${observacao.length}/250 caracteres`}>
                    <textarea id="observacao" rows={3} value={observacao} onChange={(e) =>
                        setObservacao(e.target.value)} aria-invalid={erroCampo ? true : undefined} 
                        className={campo} placeholder="Ex.: equipe de tapa-buraco programada para amanhã."/>
            </FormField>
            {erroApi && <Aviso tipo="erro">{erroApi}</Aviso>}
            <div>
                <button type="submit" disabled={enviando} className={btnDark}>
                    {enviando ? 'Salvando…' : 'Atualizar status'}
                </button>
            </div>
        </form>
    )
}