import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { AppProvider } from './context/AppContext';

import Listado from './components/Listado';  // ← Importar Listado directamente
import Formulario from './components/Formulario';
import Resumen from './pages/Resumen';
import Ajustes from './pages/Ajustes';
import './App.css';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Listado />} />
            <Route path="nuevo" element={<Formulario />} />
            <Route path="editar/:id" element={<Formulario />} />
            <Route path="resumen" element={<Resumen />} />
            <Route path="ajustes" element={<Ajustes />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;