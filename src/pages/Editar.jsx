import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { categorias } from '../data/data';
import { useNavigate, useParams } from 'react-router-dom';
import { esquemaValidacionMovimiento } from '../utils/validaciones';
import './Formulario.css';

const Editar = () => {
  const { movimientos, actualizarMovimiento } = useApp();
  const navigate = useNavigate();
  const { id } = useParams();
  
  const movimientoEditar = movimientos.find(m => m.id === id);

  const [formData, setFormData] = useState({
    descripcion: '',
    categoria: '',
    tipo: 'gasto',
    monto: '',
    fecha: ''
  });

  const [errores, setErrores] = useState({});
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    if (movimientoEditar) {
      setFormData({
        descripcion: movimientoEditar.descripcion,
        categoria: movimientoEditar.categoria,
        tipo: movimientoEditar.tipo,
        monto: movimientoEditar.monto,
        fecha: movimientoEditar.fecha
      });
    }
  }, [movimientoEditar]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'monto' ? (value === '' ? '' : Number(value)) : value
    }));
    if (errores[name]) {
      setErrores(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validarFormulario = async () => {
    try {
      await esquemaValidacionMovimiento.validate(formData, { abortEarly: false });
      setErrores({});
      return true;
    } catch (error) {
      const nuevosErrores = {};
      error.inner.forEach(err => {
        nuevosErrores[err.path] = err.message;
      });
      setErrores(nuevosErrores);
      return false;
    }
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setEnviando(true);
    
    const esValido = await validarFormulario();
    if (!esValido) {
      setEnviando(false);
      return;
    }

    try {
      const datosMovimiento = {
        descripcion: formData.descripcion.trim(),
        categoria: formData.categoria,
        tipo: formData.tipo,
        monto: Number(formData.monto),
        fecha: formData.fecha
      };

      await actualizarMovimiento(id, datosMovimiento);
      navigate('/');
      
    } catch (error) {
      console.error('Error actualizando movimiento:', error);
      alert('Error al actualizar el movimiento');
    } finally {
      setEnviando(false);
    }
  };

  if (!movimientoEditar) {
    return (
      <div className="formulario-container">
        <h1>Movimiento no encontrado</h1>
        <p>El movimiento que intentas editar no existe.</p>
        <button 
          className="btn btn-secondary"
          onClick={() => navigate('/')}
        >
          Volver al listado
        </button>
      </div>
    );
  }

  return (
    <div className="formulario-container">
      <h1>Editar Movimiento</h1>
      
      <form onSubmit={manejarEnvio} className="formulario">
        <div className="campo">
          <label htmlFor="descripcion">Descripción *</label>
          <input
            type="text"
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={manejarCambio}
            placeholder="Ej: Supermercado, Sueldo, etc."
            className={errores.descripcion ? 'error' : ''}
          />
          {errores.descripcion && <span className="error-text">{errores.descripcion}</span>}
        </div>

        <div className="campo">
          <label htmlFor="categoria">Categoría *</label>
          <select
            id="categoria"
            name="categoria"
            value={formData.categoria}
            onChange={manejarCambio}
            className={errores.categoria ? 'error' : ''}
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map(cat => (
              <option key={cat.valor} value={cat.valor}>
                {cat.etiqueta}
              </option>
            ))}
          </select>
          {errores.categoria && <span className="error-text">{errores.categoria}</span>}
        </div>

        <div className="campo">
          <label htmlFor="tipo">Tipo *</label>
          <select
            id="tipo"
            name="tipo"
            value={formData.tipo}
            onChange={manejarCambio}
            className={errores.tipo ? 'error' : ''}
          >
            <option value="gasto">Gasto</option>
            <option value="ingreso">Ingreso</option>
          </select>
          {errores.tipo && <span className="error-text">{errores.tipo}</span>}
        </div>

        <div className="campo">
          <label htmlFor="monto">Monto *</label>
          <input
            type="number"
            id="monto"
            name="monto"
            value={formData.monto}
            onChange={manejarCambio}
            placeholder="0.00"
            min="0"
            step="0.01"
            className={errores.monto ? 'error' : ''}
          />
          {errores.monto && <span className="error-text">{errores.monto}</span>}
        </div>

        <div className="campo">
          <label htmlFor="fecha">Fecha *</label>
          <input
            type="date"
            id="fecha"
            name="fecha"
            value={formData.fecha}
            onChange={manejarCambio}
            className={errores.fecha ? 'error' : ''}
          />
          {errores.fecha && <span className="error-text">{errores.fecha}</span>}
        </div>

        <div className="info-movimiento">
          <p><strong>ID:</strong> {movimientoEditar.id}</p>
          <p><strong>Creado:</strong> {new Date(movimientoEditar.fecha).toLocaleDateString('es-AR')}</p>
        </div>

        <div className="botones">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={enviando}
          >
            {enviando ? 'Actualizando...' : 'Actualizar Movimiento'}
          </button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => navigate('/')}
            disabled={enviando}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Editar;