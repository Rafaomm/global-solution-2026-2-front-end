import { useEffect, useState } from 'react' 
import { Link, NavLink } from 'react-router' 
import { useAuth } from '../context/useAuth' 
import { btnPrimary } from './ui' 
 
const LINKS = [ 
  { to: '/', rotulo: 'Início', fim: true }, 
  { to: '/ocorrencias', rotulo: 'Ocorrências', fim: true }, 
  { to: '/painel', rotulo: 'Painel' }, 
  { to: '/sobre', rotulo: 'Sobre' }, 
  { to: '/integrantes', rotulo: 'Integrantes' }, 
  { to: '/faq', rotulo: 'FAQ' }, 
  { to: '/contato', rotulo: 'Contato' }, 
] 
 
const classeLink = ({ isActive }: { isActive: boolean }) => 
  `rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive ? 'bg-white/15 text-white' : 'text-white/75 hover:text-white'}` 
 
export default function Header() { 
  const [aberto, setAberto] = useState(false) 
  const { usuario, sair } = useAuth() 
 
  useEffect(() => { 
    if (!aberto) return 
    const aoTeclar = (e: KeyboardEvent) => e.key === 'Escape' && setAberto(false) 
    window.addEventListener('keydown', aoTeclar) 
    return () => window.removeEventListener('keydown', aoTeclar) 
  }, [aberto]) 
 
  const fechar = () => setAberto(false) 
 
  const areaUsuario = usuario ? ( 
    <div className="flex items-center gap-3 text-sm text-white"> 
      <span className="max-w-40 truncate" title={usuario.email}> 
        {usuario.nome} 
      </span> 
      <button type="button" onClick={() => { sair(); fechar() }} className="rounded-md border border-white/30 px-3 py-1.5 font-medium hover:bg-white/10"> 
        Sair 
      </button> 
    </div> 
  ) : ( 
    <NavLink to="/entrar" onClick={fechar} className={classeLink}> 
      Entrar 
    </NavLink> 
  ) 
 
  return ( 
    <header className="sticky top-0 z-30 bg-asfalto text-white"> 
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6"> 
        <Link to="/" onClick={fechar} className="flex items-center gap-2.5 font-display text-xl font-extrabold tracking-tight"> 
          <span className="grid size-8 rotate-45 place-items-center rounded-sm bg-sinal" aria-hidden="true"> 
            <span className="-rotate-45 text-sm font-extrabold text-asfalto">Z</span> 
          </span> 
          Zelalerta 
        </Link> 
 
        <nav aria-label="Principal" className="hidden items-center gap-1 xl:flex"> 
          {LINKS.map((l) => ( 
            <NavLink key={l.to} to={l.to} end={l.fim} className={classeLink}> 
              {l.rotulo} 
            </NavLink> 
          ))} 
        </nav> 
 
        <div className="hidden items-center gap-4 xl:flex"> 
          {areaUsuario} 
          <Link to="/ocorrencias/nova" className={btnPrimary}> 
            Registrar problema 
          </Link> 
        </div> 
 
        <button 
          type="button" 
          className="grid size-11 place-items-center rounded-md border border-white/30 xl:hidden" 
          aria-expanded={aberto} 
          aria-controls="menu-mobile" 
          aria-label={aberto ? 'Fechar menu' : 'Abrir menu'} 
          onClick={() => setAberto((v) => !v)} 
        > 
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"> 
            {aberto ? <path d="M5 5l12 12M17 5L5 17" /> : <path d="M3 6h16M3 11h16M3 16h16" />} 
          </svg> 
        </button> 
      </div> 
 
      <div className="faixa" /> 
 
      {aberto && ( 
        <div id="menu-mobile" className="border-t border-white/10 bg-asfalto xl:hidden"> 
          <nav aria-label="Principal (celular)" className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6"> 
            {LINKS.map((l) => ( 
              <NavLink key={l.to} to={l.to} end={l.fim} onClick={fechar} className={classeLink}> 
                {l.rotulo} 
              </NavLink> 
            ))} 
            <div className="mt-3 flex flex-wrap items-center gap-3 border-t border-white/10 pt-4"> 
              {areaUsuario} 
              <Link to="/ocorrencias/nova" onClick={fechar} className={btnPrimary}> 
                Registrar problema 
              </Link> 
            </div> 
          </nav> 
        </div> 
      )} 
    </header> 
  ) 
}