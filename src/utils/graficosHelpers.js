export const prepararDatosGraficoCircular = (movimientos) => {
    const gastos = movimientos.filter(mov => mov.tipo === 'gasto');
    
    const gastosPorCategoria = gastos.reduce((acumulador, movimiento) => {
      const categoria = movimiento.categoria;
      if (!acumulador[categoria]) {
        acumulador[categoria] = 0;
      }
      acumulador[categoria] += movimiento.monto;
      return acumulador;
    }, {});
  
    const categorias = Object.keys(gastosPorCategoria);
    const montos = Object.values(gastosPorCategoria);
  
    return {
      labels: categorias.map(cat => {
        const categoriaObj = categorias.find(c => c.valor === cat);
        return categoriaObj ? categoriaObj.etiqueta : cat;
      }),
      datasets: [
        {
          data: montos,
          backgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
            '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF',
            '#4BC0C0', '#36A2EB'
          ],
          borderColor: '#ffffff',
          borderWidth: 2
        }
      ]
    };
  };
  
  export const prepararDatosGraficoBarras = (movimientos) => {
    const movimientosPorMes = movimientos.reduce((acumulador, movimiento) => {
      const fecha = new Date(movimiento.fecha);
      const mesAño = `${fecha.getFullYear()}-${(fecha.getMonth() + 1).toString().padStart(2, '0')}`;
      
      if (!acumulador[mesAño]) {
        acumulador[mesAño] = { ingresos: 0, gastos: 0 };
      }
      
      if (movimiento.tipo === 'ingreso') {
        acumulador[mesAño].ingresos += movimiento.monto;
      } else {
        acumulador[mesAño].gastos += movimiento.monto;
      }
      
      return acumulador;
    }, {});
  
    const mesesOrdenados = Object.keys(movimientosPorMes).sort();
    
    const labels = mesesOrdenados.map(mesAño => {
      const [año, mes] = mesAño.split('-');
      const meses = [
        'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
        'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
      ];
      return `${meses[parseInt(mes) - 1]} ${año}`;
    });
  
    const ingresos = mesesOrdenados.map(mes => movimientosPorMes[mes].ingresos);
    const gastos = mesesOrdenados.map(mes => movimientosPorMes[mes].gastos);
    const balances = mesesOrdenados.map(mes => 
      movimientosPorMes[mes].ingresos - movimientosPorMes[mes].gastos
    );
  
    return {
      labels,
      datasets: [
        {
          label: 'Ingresos',
          data: ingresos,
          backgroundColor: '#28a745',
          borderColor: '#28a745',
          borderWidth: 2
        },
        {
          label: 'Gastos',
          data: gastos,
          backgroundColor: '#dc3545',
          borderColor: '#dc3545',
          borderWidth: 2
        },
        {
          label: 'Balance',
          data: balances,
          backgroundColor: '#001489',
          borderColor: '#ffd100',
          borderWidth: 3,
          type: 'line',
          fill: false
        }
      ]
    };
  };
  
  export const calcularTotales = (movimientos) => {
    const ingresos = movimientos
      .filter(m => m.tipo === 'ingreso')
      .reduce((sum, m) => sum + m.monto, 0);
  
    const gastos = movimientos
      .filter(m => m.tipo === 'gasto')
      .reduce((sum, m) => sum + m.monto, 0);
  
    const balance = ingresos - gastos;
  
    return {
      ingresos,
      gastos,
      balance,
      totalMovimientos: movimientos.length
    };
  };