import { useState, type SyntheticEvent } from 'react';
import { mensagemErro } from '../services/api';
import type { Bairro, Categoria, DadosOcorrencia, Ocorrencia } from '../types';
import { GRAVIDADE_LABEL } from '../utils/format'; 
import { Aviso } from './FeedbackStates'; 
import FormField from './FormField'; 
import { btnPrimary, campo } from './ui';

interface Props {
    inicial?: Ocorrencia
    bairros: Bairro[]
    categorias: Categoria[]
    rotuloEnvio: string
    aoEnviar: (dados: DadosOcorrencia) => Promise<void>
}

type Erros = Partial<Record<'categoria' | 'bairro' | 'logradouro' | 'numero' | 
'referencia' | 'descricao', string>>

export default function OcorrenciaForm({ inicial, bairros, categorias, rotuloEnvio,
    aoEnviar }: Props ) {
        const [idCategoria, setIdCategoria] = useState(inicial ?
            String(inicial.categoria.idCategoria) : '')
            const [idBairro, setIdBairro] = useState(inicial ? String(inicial.bairro.idBairro)
        : '')
        const [logradouro, setLogradouro] = useState(inicial?.logradouro ?? '')
        const [numero, setNumero] = useState(inicial?.numero ?? '')
        const [referencia, setReferencia] = useState(inicial?.referencia ?? '')
        const [descricao, setDescricao] = useState(inicial?.descricao ?? '')
        const [erros, setErros] = useState<Erros>({})
        const [erroApi, setErroApi] = useState<string | null>(null)
        const [enviando, setEnviando] = useState(false)

        function validar(): Erros {
            const e: Erros = {}
            if (!idCategoria) e.categoria = 'Escolha a categoria do problema.'
            if (!idBairro) e.bairro = 'Escolha o bairro.'
            if (!logradouro.trim()) e.logradouro = 'Informe a rua ou avenida.'
            else if (logradouro.length > 120) e.logradouro = 'Use no máximo 120 caracteres.'
            if (numero.length > 15) e.numero = 'Use no máximo 15 caracteres.'
            if (referencia.length > 150) e.referencia = 'Use no máximo 150 caracteres.'
            if (!descricao.trim()) e .descricao = 'Descreva o problema para a prefeitura entender.'
            else if (descricao.length > 500) e.descricao = 'Use no máximo 500 caracteres.'
            return e
        }

        async function enviar(evento: SyntheticEvent<HTMLFormElement>) {
            evento.preventDefault()
            const encontrados = validar()
            setErros(encontrados)
            setErroApi(null)
            if (Object.keys(encontrados).length > 0) return 

            setEnviando(true)
            try {
                await aoEnviar({
                    idBairro: Number(idBairro),
                    idCategoria: Number(idCategoria),
                    descricao: descricao.trim(),
                    logradouro: logradouro.trim(),
                    numero: numero.trim(),
                    referencia: referencia.trim(),
                })
            } catch (e) {
                setErroApi(mensagemErro(e))
            } finally {
                setEnviando(false)
            }
        }

        const invalido = (chave: keyof Erros) => (erros[chave] ? true : undefined)

        return (
            <form onSubmit={enviar} noValidate className="grid gap-5 sm:grid-cols-2">
                <FormField id="categoria" rotulo="Categoria" erro={erros.categoria}>
                    <select id="categoria" value={idCategoria} onChange={(e) =>
                        setIdCategoria(e.target.value)} aria-invalid={invalido('categoria')} className={campo}>
                            <option value="">Selecione…</option>
                            {categorias.map((c) => (
                                <option key={c.idCategoria} value={c.idCategoria}>
                                    {c.nome} (gravidade {GRAVIDADE_LABEL[c.gravidade]?.toLowerCase() ??
                                    c.gravidade})
                                </option>
                            ))}
                        </select>
                </FormField>

                <FormField id="bairro" rotulo="Bairro" erro={erros.bairro}>
                    <select id="bairro" value={idBairro} onChange={(e) =>
                        setIdBairro(e.target.value)} aria-invalid={invalido('bairro')} className={campo}>
                            <option value="">Selecione…</option>
                            {bairros.map((b) => (
                                <option key={b.idBairro} value={b.idBairro}>
                                    {b.nome} 
                                </option>
                            ))}
                        </select>
                </FormField>

                <FormField id="logradouro" rotulo="Rua ou avenida" erro={erros.logradouro}>
                    <input id="logradouro" value={logradouro} onChange={(e) =>
                        setLogradouro(e.target.value)} aria-invalid={invalido('logradouro')} className={campo} placeholder="Ex.: Rua das Acácias"/>
                </FormField>

                <FormField id="numero" rotulo="Número (opcional)" erro={erros.numero}>
                    <input id="numero" value={numero} onChange={(e) =>
                        setNumero(e.target.value)} aria-invalid={invalido('numero')} className={campo} placeholder="Ex.: 120"/>
                </FormField>

                <div className="sm:col-span-2">
                    <FormField id="referencia" rotulo="Ponto de referência (opcional)" erro={erros.referencia}>
                        <input id="referencia" value={referencia} onChange={(e) =>
                        setReferencia(e.target.value)} aria-invalid={invalido('referencia')} className={campo} placeholder="Ex.: em frente à padaria"/>
                    </FormField>
                </div>

                <div className="sm:col-span-2">
                    <FormField id="descricao" rotulo="O que está acontecendo?" erro={erros.descricao} dica={`${descricao.length}/500 caracteres`}>
                        <textarea id="descricao" rows={4} value={descricao} onChange={(e) =>
                        setDescricao(e.target.value)} aria-invalid={invalido('descricao')} className={campo} placeholder="Ex.: buraco grande no meio da pista, já causou dois acidentes." />
                    </FormField>
                </div>

                {erroApi && (
                    <div className="sm:col-span-2">
                        <Aviso tipo="erro">{erroApi}</Aviso>
                    </div>
                )}

                <div className="sm:col-span-2">
                    <button type="submit" disabled={enviando} className={btnPrimary}>
                        {enviando ? 'Enviando…' : rotuloEnvio}
                    </button>
                </div>
            </form>
            )
        }