import { useCallback, useEffect, useState, type DependencyList } from 'react' 
import { mensagemErro } from '../services/api' 
 
/** Carrega dados da API expondo os três estados exigidos: carregando, erro e dados. */ 
export function useFetch<T>(buscar: () => Promise<T>, deps: DependencyList) { 
  const [dados, setDados] = useState<T | null>(null) 
  const [carregando, setCarregando] = useState(true) 
  const [erro, setErro] = useState<string | null>(null) 
  const [tentativa, setTentativa] = useState(0) 
 
  useEffect(() => { 
    let ativo = true 
    setCarregando(true) 
    setErro(null) 
    buscar() 
      .then((resultado) => { 
        if (ativo) setDados(resultado) 
      }) 
      .catch((e: unknown) => { 
        if (ativo) setErro(mensagemErro(e)) 
      }) 
      .finally(() => { 
        if (ativo) setCarregando(false) 
      }) 
    return () => { 
      ativo = false 
    } 
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [...deps, tentativa]) 
 
  const recarregar = useCallback(() => setTentativa((t) => t + 1), []) 
  return { dados, carregando, erro, recarregar } 
} 