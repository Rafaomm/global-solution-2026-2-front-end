// Combinações de classes utilitárias reaproveitadas em botões e campos. 
const btn = 
  'inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50' 
 
export const btnPrimary = `${btn} bg-sinal text-asfalto hover:bg-[#ffc933]` 
export const btnDark = `${btn} bg-asfalto text-white hover:bg-asfalto-2` 
export const btnOutline = `${btn} border border-asfalto/30 text-asfalto hover:bg-asfalto/5` 
export const btnDanger = `${btn} bg-alerta text-white hover:bg-[#9d2515]` 
 
export const campo = 
  'w-full rounded-md border border-linha bg-white px-3 py-2.5 text-sm text-tinta placeholder:text-suave/70 focus:border-marinho aria-[invalid=true]:border-alerta' 
 
export const cartao = 'rounded-lg border border-linha bg-papel' 