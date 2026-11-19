import { createContext } from 'react' 
import type { Usuario } from '../types' 
 
export interface AuthContextValue { 
  usuario: Usuario | null 
  entrar: (usuario: Usuario) => void 
  sair: () => void 
} 
 
export const AuthContext = createContext<AuthContextValue | null>(null) 