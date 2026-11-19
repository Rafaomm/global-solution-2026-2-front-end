import { useState } from 'react' 
import PageTitle from '../components/PageTitle' 
import { perguntas } from '../data/faq' 
 
export default function FaqPage() { 
  const [aberta, setAberta] = useState<number | null>(0) 
 
  return ( 
    <div className="space-y-8"> 
      <PageTitle titulo="Perguntas frequentes" subtitulo="Tire as dúvidas mais comuns sobre o Zelalerta." /> 
      <ul className="max-w-3xl divide-y divide-linha rounded-lg border border-linha bg-papel"> 
        {perguntas.map((p, i) => { 
          const expandida = aberta === i 
          return ( 
            <li key={p.pergunta}> 
              <h2> 
                <button 
                  type="button" 
                  aria-expanded={expandida} 
                  aria-controls={`faq-${i}`} 
                  onClick={() => setAberta(expandida ? null : i)} 
                  className="flex w-full items-center justify-between gap-4 p-5 text-left font-display text-lg font-semibold" 
                > 
                  {p.pergunta} 
                  <span className={`shrink-0 text-2xl text-marinho transition-transform ${expandida ? 'rotate-45' : ''}`} aria-hidden="true">+</span> 
                </button> 
              </h2> 
              {expandida && ( 
                <p id={`faq-${i}`} className="px-5 pb-5 text-suave"> 
                  {p.resposta} 
                </p> 
              )} 
            </li> 
          ) 
        })} 
      </ul> 
    </div> 
  ) 
} 