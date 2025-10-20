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
      console.log(`Error leyendo localStorage:`, error);
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
      console.log(`Error guardando localStorage:`, error);
    }
  };

  return [valorAlmacenado, setValor, cargando];
};

// Hook específico para movimientos - VERIFICAR QUE ESTÉ COMPLETO
export const useAlmacenamientoMovimientos = () => {
  const [movimientos, setMovimientos, cargando] = useLocalStorage('movimientos', []);

  const agregarMovimiento = (movimiento) => {
    const nuevoMovimiento = {
      ...movimiento,
      id: Date.now().toString(), // ID único
      fecha: movimiento.fecha || new Date().toISOString().split('T')[0]
    };
    setMovimientos(prev => [...prev, nuevoMovimiento]);
    return nuevoMovimiento;
  };

  const actualizarMovimiento = (id, movimientoActualizado) => {
    setMovimientos(prev => 
      prev.map(mov => mov.id === id ? { ...movimientoActualizado, id } : mov)
    );
  };

  const eliminarMovimiento = (id) => {
    setMovimientos(prev => prev.filter(mov => mov.id !== id));
  };

  const limpiarMovimientos = () => {
    setMovimientos([]);
  };

  return {
    movimientos,
    agregarMovimiento,
    actualizarMovimiento,
    eliminarMovimiento,
    limpiarMovimientos,
    cargando
  };
};