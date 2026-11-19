import type { StatusOcorrencia } from '../types' 
import { STATUS_LABEL } from '../utils/format' 
 
const CORES: Record<StatusOcorrencia, string> = { 
  ABERTA: 'bg-sinal/25 text-[#6b4f00]', 
  EM_ANALISE: 'bg-marinho/15 text-marinho', 
  EM_ATENDIMENTO: 'bg-marinho text-white', 
  RESOLVIDA: 'bg-ok/15 text-ok', 
  CANCELADA: 'bg-suave/15 text-suave', 
} 
 
export default function StatusBadge({ status }: { status: StatusOcorrencia }) { 
  return ( 
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${CORES[status]}`}> 
      {STATUS_LABEL[status]} 
    </span> 
  ) 
} 