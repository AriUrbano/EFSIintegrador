import { useState, useEffect } from 'react';

export const useLocalStorage = (clave, valorInicial) => {
  const [valorAlmacenado, setValorAlmacenado] = useState(valorInicial);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(clave);
      if (item) {
        setValorAlmacenado(JSON.parse(item));
      }
      setCargando(false);
    } catch (error) {
      console.log(`Error leyendo localStorage clave "${clave}":`, error);
      setValorAlmacenado(valorInicial);
      setCargando(false);
    }
  }, [clave]);

  const setValor = (valor) => {
    try {
      const valorAAlmacenar = valor instanceof Function ? valor(valorAlmacenado) : valor;
      setValorAlmacenado(valorAAlmacenar);
      window.localStorage.setItem(clave, JSON.stringify(valorAAlmacenar));
    } catch (error) {
      console.log(`Error guardando localStorage clave "${clave}":`, error);
    }
  };

  return [valorAlmacenado, setValor, cargando];
};

export const useAlmacenamientoMovimientos = () => {
  const [movimientos, setMovimientos, cargando] = useLocalStorage('movimientos', []);

  const agregarMovimiento = (movimiento) => {
    const nuevoMovimiento = {
      ...movimiento,
      id: Date.now().toString(), 
      fecha: movimiento.fecha || new Date().toISOString().split('T')[0]
    };
    setMovimientos(prev => [...prev, nuevoMovimiento]);
    return nuevoMovimiento;
  };

  const actualizarMovimiento = (id, movimientoActualizado) => {
    setMovimientos(prev => 
      prev.map(movimiento => 
        movimiento.id === id ? { ...movimientoActualizado, id } : movimiento
      )
    );
  };

  const eliminarMovimiento = (id) => {
    setMovimientos(prev => prev.filter(movimiento => movimiento.id !== id));
  };

  const limpiarMovimientos = () => {
    setMovimientos([]);
  };

  const calcularTotales = () => {
    const ingresos = movimientos
      .filter(m => m.tipo === 'ingreso')
      .reduce((suma, m) => suma + m.monto, 0);

    const gastos = movimientos
      .filter(m => m.tipo === 'gasto')
      .reduce((suma, m) => suma + m.monto, 0);

    const balance = ingresos - gastos;

    return { ingresos, gastos, balance };
  };

  const formatearMoneda = (monto) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(monto);
  };

  const formatearFecha = (fechaString) => {
    const opciones = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(fechaString).toLocaleDateString('es-AR', opciones);
  };

  return {
    movimientos,
    agregarMovimiento,
    actualizarMovimiento,
    eliminarMovimiento,
    limpiarMovimientos,
    calcularTotales,
    formatearMoneda,
    formatearFecha,
    cargando
  };
};