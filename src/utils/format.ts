import type { Ocorrencia, StatusOcorrencia } from '../types' 
 
export const STATUS_LABEL: Record<StatusOcorrencia, string> = { 
  ABERTA: 'Aberta', 
  EM_ANALISE: 'Em análise', 
  EM_ATENDIMENTO: 'Em atendimento', 
  RESOLVIDA: 'Resolvida', 
  CANCELADA: 'Cancelada', 
} 
 
export const STATUS_LISTA = Object.keys(STATUS_LABEL) as StatusOcorrencia[] 
 
/** Mesmas transições aceitas pela API (HistoricoStatusService) */ 
export const TRANSICOES: Record<StatusOcorrencia, StatusOcorrencia[]> = { 
  ABERTA: ['EM_ANALISE', 'CANCELADA'], 
  EM_ANALISE: ['EM_ATENDIMENTO', 'CANCELADA'], 
  EM_ATENDIMENTO: ['RESOLVIDA', 'CANCELADA'], 
  RESOLVIDA: [], 
  CANCELADA: [], 
} 
 
export const GRAVIDADE_LABEL: Record<number, string> = { 1: 'Baixa', 2: 'Média', 3: 'Alta' } 
 
export function estaEncerrada(status: StatusOcorrencia): boolean { 
  return status === 'RESOLVIDA' || status === 'CANCELADA' 
} 
 
export function formatarData(iso: string | null): string { 
  if (!iso) return '—' 
  const data = new Date(iso) 
  if (Number.isNaN(data.getTime())) return '—' 
  return data.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }) 
} 
 
export function formatarEndereco(o: Ocorrencia): string { 
  const numero = o.numero ? `, ${o.numero}` : '' 
  return `${o.logradouro}${numero} · ${o.bairro.nome}` 
} 