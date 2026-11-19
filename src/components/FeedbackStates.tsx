import type { ReactNode } from 'react' 
import { btnOutline } from './ui' 
 
export function Carregando({ texto = 'Carregando…' }: { texto?: string }) { 
  return ( 
    <div role="status" className="flex items-center gap-3 py-10 text-suave"> 
      <span className="size-5 animate-spin rounded-full border-2 border-linha border-t-marinho" aria-hidden="true" /> 
      <span>{texto}</span> 
    </div> 
  ) 
} 
 
export function ErroMensagem({ mensagem, aoTentar }: { mensagem: string; aoTentar?: () => void }) { 
  return ( 
    <div role="alert" className="rounded-lg border border-alerta/40 bg-alerta/5 p-5"> 
      <p className="font-semibold text-alerta">Não foi possível carregar</p> 
      <p className="mt-1 text-sm text-tinta">{mensagem}</p> 
      {aoTentar && ( 
        <button type="button" onClick={aoTentar} className={`${btnOutline} mt-4`}> 
          Tentar de novo 
        </button> 
      )} 
    </div> 
  ) 
} 
 
export function EstadoVazio({ titulo, texto, acao }: { titulo: string; texto: string; acao?: ReactNode }) { 
  return ( 
    <div className="rounded-lg border border-dashed border-linha bg-papel p-8 text-center"> 
      <p className="font-display text-lg font-semibold">{titulo}</p> 
      <p className="mx-auto mt-1 max-w-md text-sm text-suave">{texto}</p> 
      {acao && <div className="mt-4 flex justify-center">{acao}</div>} 
    </div> 
  ) 
} 
 
export function Aviso({ tipo, children }: { tipo: 'sucesso' | 'erro'; children: ReactNode }) { 
  const cores = tipo === 'sucesso' ? 'border-ok/40 bg-ok/10 text-ok' : 'border-alerta/40 bg-alerta/5 text-alerta' 
  return ( 
    <p role={tipo === 'erro' ? 'alert' : 'status'} className={`rounded-md border px-4 py-3 text-sm font-medium ${cores}`}> 
      {children} 
    </p> 
  ) 
} 