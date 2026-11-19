import type { Bairro, BairroRanking, Categoria } from '../types'
import { request } from './api'

export const listarBairros = () => request<Bairro[]>('/bairros')
export const listarCategorias = () => request<Categoria[]>('/categorias')
export const rankingBairros = () => request<BairroRanking[]>('/bairros/ranking')