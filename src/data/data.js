export const movimientosIniciales = [
  {
    id: '1',
    descripcion: 'Sueldo mensual',
    categoria: 'trabajo',
    tipo: 'ingreso',
    monto: 150000,
    fecha: '2024-10-01'
  },
  {
    id: '2', 
    descripcion: 'Supermercado',
    categoria: 'alimentacion',
    tipo: 'gasto',
    monto: 25000,
    fecha: '2024-10-02'
  },
  {
    id: '3',
    descripcion: 'Colectivo al trabajo',
    categoria: 'transporte', 
    tipo: 'gasto',
    monto: 5000,
    fecha: '2024-10-03'
  }
];

export const categorias = [
  { valor: 'alimentacion', etiqueta: 'Alimentación' },
  { valor: 'transporte', etiqueta: 'Transporte' },
  { valor: 'vivienda', etiqueta: 'Vivienda' },
  { valor: 'servicios', etiqueta: 'Servicios' },
  { valor: 'salud', etiqueta: 'Salud' },
  { valor: 'educacion', etiqueta: 'Educación' },
  { valor: 'entretenimiento', etiqueta: 'Entretenimiento' },
  { valor: 'ropa', etiqueta: 'Ropa' },
  { valor: 'trabajo', etiqueta: 'Trabajo' },
  { valor: 'otros', etiqueta: 'Otros' }
];

export const tiposMovimiento = [
  { valor: 'ingreso', etiqueta: 'Ingreso' },
  { valor: 'gasto', etiqueta: 'Gasto' }
];