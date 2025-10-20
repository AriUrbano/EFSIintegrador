import { useState } from "react";
import { categorias } from "../data/data";
import { useAlmacenamientoMovimientos } from "../hooks/useLocalStorage";
import "./Listado.css";

const Listado = () => {
  const { movimientos, eliminarMovimiento, cargando } = useAlmacenamientoMovimientos();
  const [busqueda, setBusqueda] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("todas");
  const [filtroTipo, setFiltroTipo] = useState("todos");

  const obtenerNombreCategoria = (valor) => {
    const cat = categorias.find((c) => c.valor === valor);
    return cat ? cat.etiqueta : valor;
  };

  const movimientosFiltrados = movimientos.filter((mov) => {
    const coincideTexto = mov.descripcion?.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria =
      filtroCategoria === "todas" || mov.categoria === filtroCategoria;
    const coincideTipo = filtroTipo === "todos" || mov.tipo === filtroTipo;

    return coincideTexto && coincideCategoria && coincideTipo;
  });

  if (cargando) {
    return <p className="mensaje-cargando">Cargando movimientos...</p>;
  }

  return (
    <div className="listado-container">
      <h1 className="titulo">💰 Listado de Movimientos</h1>


      <div className="filtros">
        <input
          type="text"
          placeholder="Buscar por descripción..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="input-busqueda"
        />

        <select
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value)}
          className="select-filtro"
        >
          <option value="todas">Todas las categorías</option>
          {categorias.map((cat) => (
            <option key={cat.valor} value={cat.valor}>
              {cat.etiqueta}
            </option>
          ))}
        </select>

        <select
          value={filtroTipo}
          onChange={(e) => setFiltroTipo(e.target.value)}
          className="select-filtro"
        >
          <option value="todos">Todos los tipos</option>
          <option value="ingreso">Ingresos</option>
          <option value="gasto">Gastos</option>
        </select>
      </div>

      
      {movimientosFiltrados.length === 0 ? (
        <p className="sin-movimientos">No hay movimientos registrados.</p>
      ) : (
        <div className="lista-movimientos">
          {movimientosFiltrados.map((mov) => (
            <div key={mov.id} className={`movimiento-item ${mov.tipo}`}>
              <div className="mov-info">
                <h3 className="mov-descripcion">{mov.descripcion}</h3>
                <p className="mov-categoria">
                  {obtenerNombreCategoria(mov.categoria)}
                </p>
                <p className="mov-fecha">{mov.fecha}</p>
              </div>

              <div className="mov-derecha">
                <span
                  className={`mov-monto ${
                    mov.tipo === "ingreso" ? "monto-ingreso" : "monto-gasto"
                  }`}
                >
                  {mov.tipo === "ingreso" ? "+" : "-"}$
                  {mov.monto.toLocaleString("es-AR")}
                </span>


                <button
                  className="boton-eliminar"
                  onClick={() =>
                    window.confirm("¿Seguro que querés eliminar este movimiento?") &&
                    eliminarMovimiento(mov.id)
                  }
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Listado;
