import { useEffect, type ReactNode } from 'react' 
 
interface Props { 
  titulo: string 
  subtitulo?: string 
  acao?: ReactNode 
} 
 
export default function PageTitle({ titulo, subtitulo, acao }: Props) { 
  useEffect(() => { 
    document.title = `${titulo} · Zelalerta` 
  }, [titulo]) 
 
  return ( 
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"> 
      <div> 
        <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">{titulo}</h1> 
        {subtitulo && <p className="mt-2 max-w-2xl text-suave">{subtitulo}</p>} 
      </div> 
      {acao} 
    </header> 
  ) 
} 