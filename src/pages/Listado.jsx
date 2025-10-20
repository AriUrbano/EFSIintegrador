import { useState, useEffect } from "react";
import { movimientosIniciales, categorias } from "../data/data";
import "./Listado.css";

const Listado = () => {  
  const [movimientos, setMovimientos] = useState([]);

  useEffect(() => {
    const guardados = localStorage.getItem("movimientos");
    if (guardados) {
      setMovimientos(JSON.parse(guardados));
    } else {
      localStorage.setItem("movimientos", JSON.stringify(movimientosIniciales));
      setMovimientos(movimientosIniciales);
    }
  }, []);

  const obtenerNombreCategoria = (valor) => {
    const cat = categorias.find((c) => c.valor === valor);
    return cat ? cat.etiqueta : valor;
  };

  return (
    <div className="listado-container">
      <h1 className="titulo">💰 Listado de Movimientos</h1>

      {movimientos.length === 0 ? (
        <p className="sin-movimientos">No hay movimientos registrados.</p>
      ) : (
        <div className="lista-movimientos">
          {movimientos.map((mov) => (
            <div
              key={mov.id}
              className={`movimiento-item ${mov.tipo}`} // ← Agregar clase del tipo
            >
              <div className="mov-info">
                <h3 className="mov-descripcion">{mov.descripcion}</h3>
                <p className="mov-categoria">
                  {obtenerNombreCategoria(mov.categoria)}
                </p>
                <p className="mov-fecha">{mov.fecha}</p>
              </div>

              <span
                className={`mov-monto ${
                  mov.tipo === "ingreso" ? "monto-ingreso" : "monto-gasto"
                }`}
              >
                {mov.tipo === "ingreso" ? "+" : "-"}$
                {mov.monto.toLocaleString("es-AR")}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Listado;