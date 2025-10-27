import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  prepararDatosGraficoCircular, 
  prepararDatosGraficoBarras, 
  calcularTotales 
} from '../utils/graficosHelpers';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
} from 'chart.js';
import './Resumen.css';

// Registrar componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);

const Resumen = () => {
  const { movimientos } = useApp();

  const totales = calcularTotales(movimientos);
  const datosCircular = prepararDatosGraficoCircular(movimientos);
  const datosBarras = prepararDatosGraficoBarras(movimientos);

  const opcionesCircular = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 12,
            weight: 'bold'
          },
          color: '#001489'
        }
      },
      title: {
        display: true,
        text: 'Distribución de Gastos por Categoría',
        font: {
          size: 18,
          weight: 'bold'
        },
        color: '#001489'
      }
    }
  };

  const opcionesBarras = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 12,
            weight: 'bold'
          },
          color: '#001489'
        }
      },
      title: {
        display: true,
        text: 'Evolución Mensual - Ingresos vs Gastos',
        font: {
          size: 18,
          weight: 'bold'
        },
        color: '#001489'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '$' + value.toLocaleString('es-AR');
          }
        }
      }
    }
  };

  return (
    <div className="resumen-container">
      <div className="resumen-header">
        <h1 className="resumen-titulo">📊 Resumen Financiero</h1>
        <p className="resumen-subtitulo">Análisis completo de tus movimientos</p>
      </div>

      {/* TARJETAS DE TOTALES */}
      <div className="totales-grid">
        <div className="total-card total-ingresos">
          <div className="total-icon">💰</div>
          <div className="total-info">
            <h3>Ingresos Totales</h3>
            <p className="total-monto">${totales.ingresos.toLocaleString('es-AR')}</p>
          </div>
        </div>

        <div className="total-card total-gastos">
          <div className="total-icon">💸</div>
          <div className="total-info">
            <h3>Gastos Totales</h3>
            <p className="total-monto">${totales.gastos.toLocaleString('es-AR')}</p>
          </div>
        </div>

        <div className="total-card total-balance">
          <div className="total-icon">⚖️</div>
          <div className="total-info">
            <h3>Balance</h3>
            <p className={`total-monto ${totales.balance >= 0 ? 'positivo' : 'negativo'}`}>
              ${totales.balance.toLocaleString('es-AR')}
            </p>
          </div>
        </div>

        <div className="total-card total-movimientos">
          <div className="total-icon">📝</div>
          <div className="total-info">
            <h3>Total Movimientos</h3>
            <p className="total-monto">{totales.totalMovimientos}</p>
          </div>
        </div>
      </div>

      {/* GRÁFICOS */}
      <div className="graficos-grid">
        <div className="grafico-card">
          <div className="grafico-contenedor">
            {datosCircular.labels.length > 0 ? (
              <Doughnut data={datosCircular} options={opcionesCircular} />
            ) : (
              <div className="sin-datos">
                <p>No hay datos para mostrar el gráfico</p>
                <p>Agrega algunos gastos para ver la distribución por categoría</p>
              </div>
            )}
          </div>
        </div>

        <div className="grafico-card">
          <div className="grafico-contenedor">
            {datosBarras.labels.length > 0 ? (
              <Bar data={datosBarras} options={opcionesBarras} />
            ) : (
              <div className="sin-datos">
                <p>No hay datos para mostrar el gráfico</p>
                <p>Agrega movimientos para ver la evolución mensual</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ESTADÍSTICAS ADICIONALES */}
      <div className="estadisticas-avanzadas">
        <h2>📈 Estadísticas Detalladas</h2>
        <div className="estadisticas-grid">
          <div className="estadistica-item">
            <h4>Promedio de Ingresos</h4>
            <p>${(totales.ingresos / Math.max(totales.totalMovimientos, 1)).toLocaleString('es-AR')}</p>
          </div>
          <div className="estadistica-item">
            <h4>Promedio de Gastos</h4>
            <p>${(totales.gastos / Math.max(totales.totalMovimientos, 1)).toLocaleString('es-AR')}</p>
          </div>
          <div className="estadistica-item">
            <h4>Porcentaje de Ahorro</h4>
            <p>{totales.ingresos > 0 ? ((totales.balance / totales.ingresos) * 100).toFixed(1) : 0}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resumen;