import { useState } from "react";
import { categorias } from "../data/data";
import { useAlmacenamientoMovimientos } from "../hooks/useLocalStorage";
import "./Listado.css";

const Listado = () => {
  const { movimientos, eliminarMovimiento, cargando } = useAlmacenamientoMovimientos();

  const [busqueda, setBusqueda] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("todas");
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [filtroFechaDesde, setFiltroFechaDesde] = useState("");
  const [filtroFechaHasta, setFiltroFechaHasta] = useState("");
  const [filtroMontoMin, setFiltroMontoMin] = useState("");
  const [filtroMontoMax, setFiltroMontoMax] = useState("");

  const obtenerNombreCategoria = (valor) => {
    const cat = categorias.find((c) => c.valor === valor);
    return cat ? cat.etiqueta : valor;
  };

  const movimientosFiltrados = movimientos.filter((mov) => {
    const coincideTexto = mov.descripcion?.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria =
      filtroCategoria === "todas" || mov.categoria === filtroCategoria;
    const coincideTipo = filtroTipo === "todos" || mov.tipo === filtroTipo;

    // Filtros de fecha
    const fechaMov = new Date(mov.fecha);
    const desdeOk = filtroFechaDesde ? fechaMov >= new Date(filtroFechaDesde) : true;
    const hastaOk = filtroFechaHasta ? fechaMov <= new Date(filtroFechaHasta) : true;

    // Filtros de monto
    const montoOk =
      (!filtroMontoMin || mov.monto >= parseFloat(filtroMontoMin)) &&
      (!filtroMontoMax || mov.monto <= parseFloat(filtroMontoMax));

    return coincideTexto && coincideCategoria && coincideTipo && desdeOk && hastaOk && montoOk;
  });

  if (cargando) {
    return <p className="mensaje-cargando">Cargando movimientos...</p>;
  }

  return (
    <div className="listado-container">
      <h1 className="titulo">💰 Listado de Movimientos</h1>

      {/* 🔍 Filtros */}
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

        <input
          type="date"
          value={filtroFechaDesde}
          onChange={(e) => setFiltroFechaDesde(e.target.value)}
          className="select-filtro"
          title="Desde"
        />

        <input
          type="date"
          value={filtroFechaHasta}
          onChange={(e) => setFiltroFechaHasta(e.target.value)}
          className="select-filtro"
          title="Hasta"
        />

        <input
          type="number"
          placeholder="Monto mínimo"
          value={filtroMontoMin}
          onChange={(e) => setFiltroMontoMin(e.target.value)}
          className="input-busqueda"
        />

        <input
          type="number"
          placeholder="Monto máximo"
          value={filtroMontoMax}
          onChange={(e) => setFiltroMontoMax(e.target.value)}
          className="input-busqueda"
        />
      </div>

      {/* 📋 Listado */}
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