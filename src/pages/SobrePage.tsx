import PageTitle from '../components/PageTitle' 
 
const ODS = [ 
  { numero: 11, titulo: 'Cidades e comunidades sustentáveis', texto: 'Torna a zeladoria dos espaços públicos mais rápida e transparente, com foco nos bairros que mais precisam.' }, 
  { numero: 16, titulo: 'Instituições eficazes', texto: 'Dá à prefeitura dados claros para decidir e abre o andamento de cada ocorrência para quem a registrou.' }, 
] 
 
export default function SobrePage() { 
  return ( 
    <div className="space-y-12"> 
      <PageTitle titulo="Sobre o Zelalerta" subtitulo="Uma solução CitizenTech para a zeladoria urbana, feita na Global Solution 2026/2 da FIAP." /> 
 
      <section className="grid gap-8 md:grid-cols-2"> 
        <div> 
          <h2 className="font-display text-2xl font-extrabold">O problema</h2> 
          <p className="mt-3 text-suave"> 
            O cidadão vê um buraco, um ponto de alagamento, um poste apagado ou lixo acumulado, reclama e nunca sabe se alguém fez algo. Do outro lado, a prefeitura recebe tudo misturado e não sabe o que atacar primeiro. 
          </p> 
        </div> 
        <div> 
          <h2 className="font-display text-2xl font-extrabold">A solução</h2> 
          <p className="mt-3 text-suave"> 
            O morador registra o problema com categoria e endereço. Outros moradores clicam em “Eu também vi” e a ocorrência sobe de prioridade. O cidadão acompanha o status e a prefeitura enxerga um painel com o que resolver primeiro e quais bairros concentram mais problemas. 
          </p> 
        </div> 
      </section> 
 
      <section> 
        <h2 className="font-display text-2xl font-extrabold">Quem participa</h2> 
        <div className="mt-4 grid gap-4 md:grid-cols-2"> 
          <div className="rounded-lg border border-linha bg-papel p-5"> 
            <h3 className="font-display text-lg font-semibold">Morador</h3> 
            <p className="mt-1 text-sm text-suave">Reclama, confirma os problemas dos vizinhos e acompanha cada etapa.</p> 
          </div> 
          <div className="rounded-lg border border-linha bg-papel p-5"> 
            <h3 className="font-display text-lg font-semibold">Equipe da prefeitura</h3> 
            <p className="mt-1 text-sm text-suave">Organiza a fila por prioridade, atualiza o status e resolve.</p> 
          </div> 
        </div> 
      </section> 
 
      <section> 
        <h2 className="font-display text-2xl font-extrabold">Objetivos de Desenvolvimento Sustentável</h2> 
        <div className="mt-4 grid gap-4 md:grid-cols-2"> 
          {ODS.map((o) => ( 
            <article key={o.numero} className="flex gap-4 rounded-lg border border-linha bg-papel p-5"> 
              <span className="grid size-14 shrink-0 place-items-center rounded-md bg-asfalto font-display text-2xl font-extrabold text-sinal">{o.numero}</span> 
              <div> 
                <h3 className="font-display text-lg font-semibold">{o.titulo}</h3> 
                <p className="mt-1 text-sm text-suave">{o.texto}</p> 
              </div> 
            </article> 
          ))} 
        </div> 
      </section> 
 
      <section> 
        <h2 className="font-display text-2xl font-extrabold">Tecnologias</h2> 
        <p className="mt-3 max-w-3xl text-suave"> 
          Front-end em React, Vite, TypeScript e Tailwind CSS, publicado na Vercel. Back-end em Java com Spring Boot e JDBC sobre Oracle, publicado no Render. Os dois se comunicam por uma API REST em JSON. 
        </p> 
      </section> 
    </div> 
  ) 
} 