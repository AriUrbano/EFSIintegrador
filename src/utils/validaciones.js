import * as Yup from 'yup';

export const esquemaValidacionMovimiento = Yup.object({
  descripcion: Yup.string()
    .min(3, 'La descripción debe tener al menos 3 caracteres')
    .required('La descripción es obligatoria'),
  
  categoria: Yup.string()
    .required('La categoría es obligatoria'),
  
  tipo: Yup.string()
    .oneOf(['ingreso', 'gasto'], 'Tipo inválido')
    .required('El tipo es obligatorio'),
  
  monto: Yup.number()
    .typeError('El monto debe ser un número')
    .positive('El monto debe ser positivo')
    .required('El monto es obligatorio'),
  
  fecha: Yup.date()
    .typeError('Fecha inválida')
    .max(new Date(), 'La fecha no puede ser futura')
    .required('La fecha es obligatoria')
});