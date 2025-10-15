import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

import Home from './pages/home';
import Nuevo from './pages/Nuevo';
import Resumen from './pages/Resumen';
import Ajustes from './pages/Ajustes';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="Nuevo" element={<Nuevo />} />
          <Route path="Resumen" element={<Resumen />} />
          <Route path="Ajustes" element={<Ajustes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;