export type Perfil = 'MORADOR' | 'PREFEITURA'

export type StatusOcorrencia = 'ABERTA' | 'EM_ANALISE' | 'EM_ATENDIMENTO' | 'RESOLVIDA' | 'CANCELADA'

export interface Usuario {
  idUsuario: number
  nome: string
  email: string
  perfil: Perfil
}

export interface Bairro {
  idBairro: number
  nome: string
}

export interface Categoria {
  idCategoria: number
  nome: string
  gravidade: number
}

export interface Ocorrencia {
  idOcorrencia: number
  idUsuario: number
  bairro: Bairro
  categoria: Categoria
  descricao: string
  logradouro: string
  numero: string | null
  referencia: string | null
  dataAbertura: string
  status: StatusOcorrencia
  dataResolucao: string | null
  qtdConfirmacoes: number
  prioridade: number
}

export interface OcorrenciaPayload {
  idUsuario: number
  bairro: { idBairro: number }
  categoria: { idCategoria: number }
  descricao: string
  logradouro: string
  numero: string
  referencia: string
}

export interface DadosOcorrencia {
  idBairro: number
  idCategoria: number
  descricao: string
  logradouro: string
  numero: string
  referencia: string
}

export interface HistoricoStatus {
  idHistorico: number
  idOcorrencia: number
  idUsuario: number
  statusAnterior: StatusOcorrencia | null
  statusNovo: StatusOcorrencia
  dataAlteracao: string
  observacao: string
}

export interface NovoHistorico {
  idUsuario: number
  statusNovo: StatusOcorrencia
  observacao: string
}

export interface BairroRanking {
  idBairro: number
  nome: string
  totalOcorrencias: number
  totalAbertas: number
}

export interface Integrante {
  rm: string
  nome: string
  funcao: string
  github?: string
  linkedin?: string
}