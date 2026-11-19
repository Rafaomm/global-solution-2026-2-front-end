import { Link } from 'react-router' 
 
export default function Footer() { 
  return ( 
    <footer className="mt-20 bg-asfalto text-white/80"> 
      <div className="faixa" /> 
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3"> 
        <div> 
          <p className="font-display text-lg font-extrabold text-white">Zelalerta</p> 
          <p className="mt-2 text-sm">Zeladoria colaborativa: o morador registra, os vizinhos confirmam e a prefeitura prioriza.</p> 
        </div> 
        <nav aria-label="Rodapé" className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm"> 
          <Link to="/ocorrencias" className="hover:text-white">Ocorrências</Link> 
          <Link to="/painel" className="hover:text-white">Painel</Link> 
          <Link to="/sobre" className="hover:text-white">Sobre</Link> 
          <Link to="/integrantes" className="hover:text-white">Integrantes</Link> 
          <Link to="/faq" className="hover:text-white">FAQ</Link> 
          <Link to="/contato" className="hover:text-white">Contato</Link> 
        </nav> 
        <div className="text-sm"> 
          <p className="font-semibold text-white">Objetivos de Desenvolvimento Sustentável</p> 
          <p className="mt-2">ODS 11 · Cidades e comunidades sustentáveis</p> 
          <p>ODS 16 · Instituições eficazes</p> 
        </div> 
      </div> 
      <p className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/60"> 
        Global Solution 2026/2 · CitizenTech · FIAP 
      </p> 
    </footer> 
  ) 
} 

