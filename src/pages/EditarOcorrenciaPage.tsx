import { Link, useNavigate, useParams } from 'react-router' 
import { Carregando, ErroMensagem, EstadoVazio } from '../components/FeedbackStates';
import OcorrenciaForm from '../components/OcorrenciaForm';
import PageTitle from '../components/PageTitle';
import { btnPrimary } from '../components/ui';
import { useAuth } from '../context/useAuth';
import { useFetch } from '../hooks/useFetch'; 
import { listarBairros, listarCategorias } from '../services/catalogoService'; 
import { atualizarOcorrencia, buscarOcorrencia } from '../services/ocorrenciaService'; 
import type { DadosOcorrencia } from '../types';

export default function EditarOcorrenciaPage() { 
  const { id } = useParams() 
  const idOcorrencia = Number(id) 
  const { usuario } = useAuth() 
  const navigate = useNavigate()

  const carga = useFetch(async () => { 
    const [ocorrencia, bairros, categorias] = await Promise.all([buscarOcorrencia(idOcorrencia), listarBairros(), listarCategorias()]) 
    return { ocorrencia, bairros, categorias } 
  }, [idOcorrencia])

  async function salvar(dados: DadosOcorrencia) { 
    if (!usuario) return 
    await atualizarOcorrencia(idOcorrencia, { 
      idUsuario: usuario.idUsuario,
      bairro: { idBairro: dados.idBairro }, 
      categoria: { idCategoria: dados.idCategoria }, 
      descricao: dados.descricao, 
      logradouro: dados.logradouro, 
      numero: dados.numero, 
      referencia: dados.referencia, 
    })
    navigate(`/ocorrencias/${idOcorrencia}`, { state: { aviso: 'Alterações salvas.' } }) 
  } 

  return ( 
    <div className="mx-auto max-w-3xl space-y-8"> 
      <PageTitle titulo="Editar ocorrência" subtitulo="Somente o autor pode alterar uma ocorrência que ainda não foi encerrada." /> 
      {!usuario ? ( 
        <EstadoVazio titulo="Entre para editar" texto="Use a conta que registrou a ocorrência." acao={<Link to="/entrar" className={btnPrimary}>Entrar</Link>} /> 
      ) : ( 
        <> 
          {carga.carregando && <Carregando />} 
          {carga.erro && <ErroMensagem mensagem={carga.erro} aoTentar={carga.recarregar} />} 
          {carga.dados && ( 
            <OcorrenciaForm inicial={carga.dados.ocorrencia} bairros={carga.dados.bairros} categorias={carga.dados.categorias} rotuloEnvio="Salvar alterações" aoEnviar={salvar} /> 
          )} 
        </> 
      )} 
    </div> 
  ) 
} 

