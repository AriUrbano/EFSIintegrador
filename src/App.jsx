import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { AppProvider } from './context/AppContext';

import Listado from './pages/Listado';
import Nuevo from './pages/Nuevo';
import Editar from './pages/Editar';
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
            <Route path="nuevo" element={<Nuevo />} />
            <Route path="editar/:id" element={<Editar />} />
            <Route path="resumen" element={<Resumen />} />
            <Route path="ajustes" element={<Ajustes />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;