// A API não informa se o usuário já confirmou uma ocorrência, então guardamos 
// os ids confirmados neste navegador para mostrar o botão no estado correto. 
const chave = (idUsuario: number) => `zela:confirmados:${idUsuario}` 
 
export function lerConfirmados(idUsuario: number): number[] { 
  try { 
    const bruto = localStorage.getItem(chave(idUsuario)) 
    return bruto ? (JSON.parse(bruto) as number[]) : [] 
  } catch { 
    return [] 
  } 
} 
 
export function salvarConfirmado(idUsuario: number, idOcorrencia: number, confirmado: boolean): void { 
  try { 
    const atuais = new Set(lerConfirmados(idUsuario)) 
    if (confirmado) atuais.add(idOcorrencia) 
    else atuais.delete(idOcorrencia) 
    localStorage.setItem(chave(idUsuario), JSON.stringify([...atuais])) 
  } catch { 
    // armazenamento indisponível: o botão apenas não lembra o estado 
  } 
} 