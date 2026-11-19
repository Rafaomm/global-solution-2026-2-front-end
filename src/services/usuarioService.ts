import type { Usuario } from '../types'
import { request } from './api'

export const cadastrarUsuario = (nome: string, email: string) =>
  request<Usuario>('/usuarios', 'POST', { nome, email })

export const entrarComEmail = (email: string) => request<Usuario>('/usuarios/login', 'POST', { email })
