import { Link, useNavigate } from 'react-router'; 
import { Carregando, ErroMensagem, EstadoVazio } from '../components/FeedbackStates'; 
import OcorrenciaForm from '../components/OcorrenciaForm'; 
import PageTitle from '../components/PageTitle'; 
import { btnPrimary } from '../components/ui'; 
import { useAuth } from '../context/useAuth';
import { useFetch } from '../hooks/useFetch'; 
import { listarBairros, listarCategorias } from '../services/catalogoService'; 
import { registrarOcorrencia } from '../services/ocorrenciaService'; 
import type { DadosOcorrencia } from '../types'; 

export default function NovaOcorrenciaPage() {
    const { usuario } = useAuth()
    const navigate = useNavigate()
    const catalogo = useFetch(async () => {
        const [bairros, categorias] = await Promise.all([listarBairros(),
            listarCategorias()])
            return { bairros, categorias }
    }, [])

    async function registrar(dados: DadosOcorrencia) { 
        if (!usuario) return 
        const criada = await registrarOcorrencia({ 
            idUsuario: usuario.idUsuario, 
            bairro: { idBairro: dados.idBairro }, 
            categoria: { idCategoria: dados.idCategoria }, 
            descricao: dados.descricao, 
            logradouro: dados.logradouro, 
            numero: dados.numero, 
            referencia: dados.referencia, 
        }) 
        navigate(`/ocorrencias/${criada.idOcorrencia}`, { state: { aviso: 'Ocorrência registrada. Agora é só acompanhar o andamento.' } }) 
    } 

    return ( 
        <div className="mx-auto max-w-3xl space-y-8"> 
            <PageTitle titulo="Registrar problema" subtitulo="Conte o que está acontecendo e onde. Quanto mais claro o relato, mais rápido a prefeitura age." /> 
 
        {!usuario ? ( 
            <EstadoVazio titulo="Entre para registrar um problema" 
            texto="Precisamos saber quem está registrando para você poder acompanhar o andamento." 
            acao={<Link to="/entrar" className={btnPrimary}>Entrar ou criar conta</Link>} /> 
        ) : ( 
        <> 
          {catalogo.carregando && <Carregando texto="Carregando bairros e categorias…" />} 
          {catalogo.erro && <ErroMensagem mensagem={catalogo.erro} aoTentar={catalogo.recarregar} />} 
          {catalogo.dados && ( <OcorrenciaForm bairros={catalogo.dados.bairros} categorias={catalogo.dados.categorias} rotuloEnvio="Registrar problema" aoEnviar={registrar} />
        )} 
        </> 
      )} 
    </div> 
  ) 
} 


