import { useState } from 'react'
import { Link, useLocation } from 'react-router'
import {
  Aviso,
  Carregando,
  ErroMensagem,
  EstadoVazio,
} from '../components/FeedbackStates'
import OcorrenciaCard from '../components/OcorrenciaCard'
import PageTitle from '../components/PageTitle'
import { btnOutline, btnPrimary, campo } from '../components/ui'
import { useFetch } from '../hooks/useFetch'
import { listarBairros } from '../services/catalogoService'
import { listarOcorrencias } from '../services/ocorrenciaService'
import type { StatusOcorrencia } from '../types'
import { STATUS_LABEL, STATUS_LISTA } from '../utils/format'

export default function OcorrenciasPage() {
  const aviso = (useLocation().state as { aviso?: string } | null)?.aviso
  const [status, setStatus] = useState<StatusOcorrencia | ''>('')
  const [ordenar, setOrdenar] = useState<'prioridade' | ''>('prioridade')
  const [idBairro, setIdBairro] = useState('')
  const [busca, setBusca] = useState('')

  const lista = useFetch(
    () => listarOcorrencias(status, ordenar),
    [status, ordenar],
  )
  const bairros = useFetch(listarBairros, [])

  const termo = busca.trim().toLowerCase()
  const filtradas = (lista.dados ?? []).filter(
    (o) =>
      (!idBairro || o.bairro.idBairro === Number(idBairro)) &&
      (!termo ||
        `${o.descricao} ${o.logradouro} ${o.categoria.nome}`
          .toLowerCase()
          .includes(termo)),
  )
  const filtrando = Boolean(status || idBairro || termo)

  return (
    <div className="space-y-8">
      <PageTitle
        titulo="Ocorrências"
        subtitulo="Problemas registrados pelos moradores. Confirme os que você também viu."
        acao={
          <Link to="/ocorrencias/nova" className={btnPrimary}>
            Registrar problema
          </Link>
        }
      />

      {aviso && <Aviso tipo="sucesso">{aviso}</Aviso>}

      <form
        role="search"
        onSubmit={(e) => e.preventDefault()}
        className="grid gap-4 rounded-lg border border-linha bg-papel p-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <label className="text-sm font-semibold">
          Buscar
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Rua, categoria ou descrição"
            className={`${campo} mt-1.5 font-normal`}
          />
        </label>

        <label className="text-sm font-semibold">
          Status
          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as StatusOcorrencia | '')
            }
            className={`${campo} mt-1.5 font-normal`}
          >
            <option value="">Todos</option>
            {STATUS_LISTA.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABEL[s]}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm font-semibold">
          Bairro
          <select
            value={idBairro}
            onChange={(e) => setIdBairro(e.target.value)}
            className={`${campo} mt-1.5 font-normal`}
          >
            <option value="">Todos</option>
            {(bairros.dados ?? []).map((b) => (
              <option key={b.idBairro} value={b.idBairro}>
                {b.nome}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm font-semibold">
          Ordenar por
          <select
            value={ordenar}
            onChange={(e) =>
              setOrdenar(e.target.value as 'prioridade' | '')
            }
            className={`${campo} mt-1.5 font-normal`}
          >
            <option value="prioridade">Maior prioridade</option>
            <option value="">Mais recentes</option>
          </select>
        </label>
      </form>

      {lista.carregando && (
        <Carregando texto="Buscando ocorrências… na primeira visita o servidor pode levar alguns segundos para responder." />
      )}

      {lista.erro && (
        <ErroMensagem
          mensagem={lista.erro}
          aoTentar={lista.recarregar}
        />
      )}

      {!lista.carregando && !lista.erro && filtradas.length === 0 && (
        <EstadoVazio
          titulo={
            filtrando
              ? 'Nenhuma ocorrência com esses filtros'
              : 'Nenhuma ocorrência registrada ainda'
          }
          texto={
            filtrando
              ? 'Tente limpar a busca ou escolher outro status ou bairro.'
              : 'Seja o primeiro a registrar um problema no seu bairro.'
          }
          acao={
            filtrando ? (
              <button
                type="button"
                className={btnOutline}
                onClick={() => {
                  setStatus('')
                  setIdBairro('')
                  setBusca('')
                }}
              >
                Limpar filtros
              </button>
            ) : (
              <Link to="/ocorrencias/nova" className={btnPrimary}>
                Registrar problema
              </Link>
            )
          }
        />
      )}

      {!lista.erro && filtradas.length > 0 && (
        <>
          <p className="text-sm text-suave" aria-live="polite">
            {filtradas.length}{' '}
            {filtradas.length === 1 ? 'ocorrência' : 'ocorrências'}
          </p>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filtradas.map((o) => (
              <OcorrenciaCard
                key={o.idOcorrencia}
                ocorrencia={o}
                aoMudar={lista.recarregar}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}