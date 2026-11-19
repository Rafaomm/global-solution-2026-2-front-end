import { BrowserRouter, Route, Routes } from 'react-router';
import Layout from './components/Layout';
import AuthProvider from './context/AuthProvider';
import ContatoPage from './pages/ContatoPage';
import EditarOcorrenciaPage from './pages/EditarOcorrenciaPage';
import EntrarPage from './pages/EntrarPage';
import FaqPage from './pages/FaqPage';
import HomePage from './pages/HomePage';
import IntegranteDetalhePage from './pages/IntegranteDetalhePage';
import IntegrantesPage from './pages/IntegrantesPage';
import NaoEncontradaPage from './pages/NaoEncontradaPage';
import NovaOcorrenciaPage from './pages/NovaOcorrenciaPage';
import OcorrenciaDetalhePage from './pages/OcorrenciaDetalhePage';
import OcorrenciasPage from './pages/OcorrenciasPage';
import PainelPage from './pages/PainelPage';
import SobrePage from './pages/SobrePage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>

        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="sobre" element={<SobrePage />} />
            <Route path="integrantes" element={<IntegrantesPage />} />
            <Route path="integrantes/:rm" element={<IntegranteDetalhePage />} />
            <Route path="faq" element={<FaqPage />} />
            <Route path="contato" element={<ContatoPage />} />
            <Route path="entrar" element={<EntrarPage />} />
            <Route path="ocorrencias" element={<OcorrenciasPage />} />
            <Route path="ocorrencias/nova" element={<NovaOcorrenciaPage />} />
            <Route path="ocorrencias/:id" element={<OcorrenciaDetalhePage />} />
            <Route path="ocorrencias/:id/editar" element={<EditarOcorrenciaPage />} />
            <Route path="painel" element={<PainelPage />} />
            <Route path="*" element={<NaoEncontradaPage />} />
          </Route>
        </Routes>

      </BrowserRouter>
    </AuthProvider>
  )
}
