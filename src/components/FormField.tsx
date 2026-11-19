import type { ReactNode } from 'react' 
 
interface Props { 
  id: string 
  rotulo: string 
  erro?: string 
  dica?: string 
  children: ReactNode 
} 
 
export default function FormField({ id, rotulo, erro, dica, children }: Props) { 
  return ( 
    <div> 
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold"> 
        {rotulo} 
      </label> 
      {children} 
      {dica && !erro && <p className="mt-1 text-xs text-suave">{dica}</p>} 
      {erro && ( 
        <p id={`${id}-erro`} role="alert" className="mt-1 text-xs font-medium text-alerta"> 
          {erro} 
        </p> 
      )} 
    </div> 
  ) 
} 