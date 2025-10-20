import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { categorias } from '../data/data';
import { useNavigate } from 'react-router-dom';
import './FormularioPage.css';

const Nuevo = () => {
  const { agregarMovimiento } = useApp();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    descripcion: '',
    categoria: '',
    tipo: 'gasto',
    monto: '',
    fecha: new Date().toISOString().split('T')[0]
  });

  const [errores, setErrores] = useState({});

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errores[name]) {
      setErrores(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (formData.descripcion.length < 3) {
      nuevosErrores.descripcion = 'La descripción debe tener al menos 3 caracteres';
    }

    if (!formData.categoria) {
      nuevosErrores.categoria = 'Selecciona una categoría';
    }

    if (formData.monto <= 0 || !formData.monto) {
      nuevosErrores.monto = 'El monto debe ser positivo';
    }

    if (!formData.fecha) {
      nuevosErrores.fecha = 'La fecha es obligatoria';
    }

    if (formData.fecha && new Date(formData.fecha) > new Date()) {
      nuevosErrores.fecha = 'La fecha no puede ser futura';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    
    if (!validarFormulario()) {
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

      agregarMovimiento(datosMovimiento);
      navigate('/');
      
    } catch (error) {
      console.error('Error guardando movimiento:', error);
      alert('Error al guardar el movimiento');
    }
  };

  return (
    <div className="formulario-page">
      <h1>Nuevo Movimiento</h1>
      
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
          >
            <option value="gasto">Gasto</option>
            <option value="ingreso">Ingreso</option>
          </select>
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

        <div className="botones">
          <button type="submit" className="btn btn-primary">
            Guardar Movimiento
          </button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => navigate('/')}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Nuevo;