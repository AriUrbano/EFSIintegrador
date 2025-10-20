import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import './Ajustes.css';

const Ajustes = () => {
  const { limpiarMovimientos, movimientos } = useApp();
  const [temaOscuro, setTemaOscuro] = useState(false);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

  // Función para alternar tema oscuro
  const alternarTemaOscuro = () => {
    const nuevoTema = !temaOscuro;
    setTemaOscuro(nuevoTema);
    document.body.classList.toggle('tema-oscuro', nuevoTema);
    // Guardar preferencia en localStorage
    localStorage.setItem('tema-oscuro', nuevoTema.toString());
  };

  // Cargar tema al iniciar
  React.useEffect(() => {
    const temaGuardado = localStorage.getItem('tema-oscuro') === 'true';
    setTemaOscuro(temaGuardado);
    document.body.classList.toggle('tema-oscuro', temaGuardado);
  }, []);

  // Función para limpiar datos
  const manejarLimpiarDatos = () => {
    limpiarMovimientos();
    setMostrarConfirmacion(false);
    alert('Todos los datos han sido eliminados correctamente.');
  };

  return (
    <div className="ajustes-container">
      <h1>Ajustes</h1>
      
      <div className="ajustes-grid">
        {/* Tema Oscuro */}
        <div className="ajuste-card">
          <div className="ajuste-header">
            <h2>🎨 Tema Oscuro</h2>
          </div>
          <div className="ajuste-content">
            <div className="toggle-item">
              <span>Activar tema oscuro</span>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={temaOscuro}
                  onChange={alternarTemaOscuro}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <p className="ajuste-descripcion">
              Cambia entre tema claro y oscuro para una mejor experiencia visual.
            </p>
          </div>
        </div>

        {/* Reset Datos */}
        <div className="ajuste-card">
          <div className="ajuste-header">
            <h2>🗑️ Resetear Datos</h2>
          </div>
          <div className="ajuste-content">
            <div className="estado-datos">
              <p>Movimientos almacenados: <strong>{movimientos.length}</strong></p>
            </div>
            
            <button 
              className="btn btn-peligro"
              onClick={() => setMostrarConfirmacion(true)}
              disabled={movimientos.length === 0}
            >
              Limpiar Todos los Datos
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Confirmación */}
      {mostrarConfirmacion && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>⚠️ Confirmar Eliminación</h3>
            <p>¿Estás seguro de que quieres eliminar todos los datos?</p>
            <p>Se borrarán <strong>{movimientos.length}</strong> movimientos.</p>
            <div className="modal-botones">
              <button 
                className="btn btn-peligro"
                onClick={manejarLimpiarDatos}
              >
                Sí, Eliminar Todo
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => setMostrarConfirmacion(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ajustes;