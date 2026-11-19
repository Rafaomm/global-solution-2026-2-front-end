import type { HistoricoStatus, NovoHistorico, Ocorrencia, OcorrenciaPayload, StatusOcorrencia } from '../types'
import { request } from './api'

export function listarOcorrencias(status?: StatusOcorrencia | '', ordenar?: 'prioridade' | ''): Promise<Ocorrencia[]> {
  const params = new URLSearchParams()
  if (status) params.set('status', status)
  if (ordenar) params.set('ordenar', ordenar)
  const consulta = params.toString()
  return request<Ocorrencia[]>(`/ocorrencias${consulta ? `?${consulta}` : ''}`)
}

export const buscarOcorrencia = (id: number) => request<Ocorrencia>(`/ocorrencias/${id}`)

export const registrarOcorrencia = (dados: OcorrenciaPayload) => request<Ocorrencia>('/ocorrencias', 'POST', dados)

export const atualizarOcorrencia = (id: number, dados: OcorrenciaPayload) =>
  request<Ocorrencia>(`/ocorrencias/${id}`, 'PUT', dados)

export const excluirOcorrencia = (id: number, idUsuario: number) =>
  request<void>(`/ocorrencias/${id}?idUsuario=${idUsuario}`, 'DELETE')

export const listarHistorico = (id: number) => request<HistoricoStatus[]>(`/ocorrencias/${id}/historico`)

export const alterarStatus = (id: number, dados: NovoHistorico) =>
  request<HistoricoStatus>(`/ocorrencias/${id}/historico`, 'POST', dados)

export const confirmarOcorrencia = (id: number, idUsuario: number) =>
  request<unknown>(`/ocorrencias/${id}/confirmacoes?idUsuario=${idUsuario}`, 'POST')

export const removerConfirmacao = (id: number, idUsuario: number) =>
  request<void>(`/ocorrencias/${id}/confirmacoes?idUsuario=${idUsuario}`, 'DELETE')
