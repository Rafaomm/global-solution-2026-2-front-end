import { useCallback, useMemo, useState, type ReactNode } from 'react' 
import type { Usuario } from '../types' 
import { AuthContext } from './auth-context' 
 
const CHAVE = 'zela:usuario' 
 
function lerUsuarioSalvo(): Usuario | null { 
  try { 
    const bruto = localStorage.getItem(CHAVE) 
    return bruto ? (JSON.parse(bruto) as Usuario) : null 
  } catch { 
    return null 
  } 
} 
 
export default function AuthProvider({ children }: { children: ReactNode }) { 
  const [usuario, setUsuario] = useState<Usuario | null>(lerUsuarioSalvo) 
 
  const entrar = useCallback((novo: Usuario) => { 
    setUsuario(novo) 
    try { 
      localStorage.setItem(CHAVE, JSON.stringify(novo)) 
    } catch { 
      // sem armazenamento: a sessão dura até recarregar a página 
    } 
  }, []) 
 
  const sair = useCallback(() => { 
    setUsuario(null) 
    try { 
      localStorage.removeItem(CHAVE) 
    } catch { 
      // ignorado 
    } 
  }, []) 
 
  const valor = useMemo(() => ({ usuario, entrar, sair }), [usuario, entrar, sair]) 
  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider> 
} 