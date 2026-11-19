import { useState } from 'react' 
import { Link } from 'react-router' 
import PageTitle from '../components/PageTitle' 
import { btnOutline, btnPrimary } from '../components/ui' 
 
const PASSOS = [ 
  { titulo: 'Você registra', texto: 'Escolha a categoria, o bairro e a rua. Em um minuto o problema está na fila da prefeitura.' }, 
  { titulo: 'Vizinhos confirmam', texto: 'Quem também viu o problema toca em “Eu também vi” e a prioridade da ocorrência sobe.' }, 
  { titulo: 'A prefeitura prioriza', texto: 'O painel mostra o que resolver primeiro e quais bairros concentram mais problemas.' }, 
  { titulo: 'Você acompanha', texto: 'Cada mudança de status fica na linha do tempo: em análise, em atendimento, resolvida.' }, 
] 
 

function DemoPrioridade() { 
  const [confirmacoes, setConfirmacoes] = useState(6) 
  const [confirmado, setConfirmado] = useState(false) 
  const gravidade = 3 
  const prioridade = gravidade * 5 + confirmacoes 
 
  function alternar() { 
    setConfirmacoes((n) => (confirmado ? n - 1 : n + 1)) 
    setConfirmado((v) => !v) 
  } 
 
  return ( 
    <div className="rounded-lg bg-papel p-5 text-tinta shadow-xl"> 
      <p className="text-xs font-semibold text-suave">Exemplo</p> 
      <p className="mt-1 font-display text-xl font-extrabold">Buraco na Rua das Acácias</p> 
      <p className="text-sm text-suave">Gravidade alta · aberta há 3 dias</p> 
      <div className="mt-5"> 
        <div className="flex items-baseline justify-between text-sm"> 
          <span>Prioridade</span> 
          <span className="font-display text-3xl font-extrabold">{prioridade}</span> 
        </div> 
        <div className="mt-2 h-3 overflow-hidden rounded-full bg-linha" role="progressbar" aria-valuemin={0} aria-valuemax={40} aria-valuenow={prioridade} aria-label="Prioridade da ocorrência"> 
          <div className="h-full rounded-full bg-sinal transition-[width] duration-500" style={{ width: `${Math.min(100, (prioridade / 40) * 100)}%` }} /> 
        </div> 
        <p className="mt-2 text-xs text-suave"> 
          {gravidade} × 5 de gravidade + {confirmacoes} {confirmacoes === 1 ? 'confirmação' : 'confirmações'} 
        </p> 
      </div> 
      <button type="button" onClick={alternar} aria-pressed={confirmado} className={`${btnPrimary} mt-5 w-full ${confirmado ? 'ring-2 ring-asfalto' : ''}`}> 
        {confirmado ? 'Você viu · desfazer' : 'Eu também vi'} 
      </button> 
    </div> 
  ) 
} 
 
export default function HomePage() { 
  return ( 
    <div className="space-y-16"> 
      <section className="-mx-4 -mt-10 bg-asfalto px-4 py-14 text-white sm:-mx-6 sm:px-6 lg:rounded-b-2xl"> 
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.3fr_1fr]"> 
          <div> 
            <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl"> 
              Viu um buraco? Diga que também viu. 
            </h1> 
            <p className="mt-5 max-w-xl text-lg text-white/80"> 
              No Zelalerta, cada morador que confirma um problema empurra a ocorrência para o topo da fila. A prefeitura passa a saber o que atacar primeiro. 
            </p> 
            <div className="mt-8 flex flex-wrap gap-3"> 
              <Link to="/ocorrencias/nova" className={btnPrimary}>Registrar problema</Link> 
              <Link to="/ocorrencias" className={`${btnOutline} border-white/40 text-white hover:bg-white/10`}>Ver ocorrências</Link> 
            </div> 
          </div> 
          <DemoPrioridade /> 
        </div> 
      </section> 
 
      <section aria-labelledby="como-funciona"> 
        <PageTitle titulo="Como funciona" subtitulo="Do relato ao problema resolvido, em quatro etapas." /> 
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"> 
          {PASSOS.map((p, i) => ( 
            <li key={p.titulo} className="rounded-lg border border-linha bg-papel p-5"> 
              <span className="font-display text-3xl font-extrabold text-marinho">{i + 1}</span> 
              <h3 className="mt-2 font-display text-lg font-semibold">{p.titulo}</h3> 
              <p className="mt-1 text-sm text-suave">{p.texto}</p> 
            </li> 
          ))} 
        </ol> 
      </section> 
 
      <section className="grid gap-6 rounded-lg border border-linha bg-papel p-6 sm:p-8 md:grid-cols-2"> 
        <div> 
          <h2 className="font-display text-2xl font-extrabold">Para o morador</h2> 
          <p className="mt-2 text-suave">Registre lixo acumulado, poste apagado, alagamento ou buraco e acompanhe até a resolução, sem precisar ligar para ninguém.</p> 
          <Link to="/entrar" className={`${btnOutline} mt-4`}>Entrar com meu e-mail</Link> 
        </div> 
        <div> 
          <h2 className="font-display text-2xl font-extrabold">Para a prefeitura</h2> 
          <p className="mt-2 text-suave">Veja a fila ordenada por prioridade e o ranking de bairros com mais problemas. Atualize o status e deixe o registro público.</p> 
          <Link to="/painel" className={`${btnOutline} mt-4`}>Abrir o painel</Link> 
        </div> 
      </section> 
    </div> 
  ) 
} 