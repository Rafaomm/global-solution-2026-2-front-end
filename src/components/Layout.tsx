import { useEffect } from 'react' 
import { Outlet, useLocation } from 'react-router' 
import Footer from './Footer' 
import Header from './Header' 
 
export default function Layout() { 
  const { pathname } = useLocation() 
 
  useEffect(() => { 
    window.scrollTo(0, 0) 
  }, [pathname]) 
 
  return ( 
    <div className="flex min-h-svh flex-col"> 
      <Header /> 
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6"> 
        <Outlet /> 
      </main> 
      <Footer /> 
    </div> 
  ) 
} 