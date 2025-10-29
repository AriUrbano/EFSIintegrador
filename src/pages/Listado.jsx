import { useState } from "react";
import { categorias } from "../data/data";
import { useAlmacenamientoMovimientos } from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import "./Listado.css";
import "../Styles/EstilosGLobales.css";

const Listado = () => {
  const { movimientos, eliminarMovimiento, cargando } = useAlmacenamientoMovimientos();
  const navigate = useNavigate();

  const [busqueda, setBusqueda] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("todas");
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [filtroFechaDesde, setFiltroFechaDesde] = useState("");
  const [filtroFechaHasta, setFiltroFechaHasta] = useState("");
  const [filtroMontoMin, setFiltroMontoMin] = useState("");
  const [filtroMontoMax, setFiltroMontoMax] = useState("");
  const [mensaje, setMensaje] = useState("");

  const obtenerNombreCategoria = (valor) => {
    const cat = categorias.find((c) => c.valor === valor);
    return cat ? cat.etiqueta : valor;
  };

  const movimientosFiltrados = movimientos.filter((mov) => {
    const coincideTexto = mov.descripcion?.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria = filtroCategoria === "todas" || mov.categoria === filtroCategoria;
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

  const manejarEliminar = (id, descripcion) => {
    if (window.confirm(`¿Estás seguro de que queres eliminar "${descripcion}"?`)) {
      eliminarMovimiento(id);
      setMensaje(`"${descripcion}" fue eliminado correctamente`);
      setTimeout(() => setMensaje(""), 3000);
    }
  };

  const limpiarFiltros = () => {
    setBusqueda("");
    setFiltroCategoria("todas");
    setFiltroTipo("todos");
    setFiltroFechaDesde("");
    setFiltroFechaHasta("");
    setFiltroMontoMin("");
    setFiltroMontoMax("");
    setMensaje("Filtros limpiados correctamente");
    setTimeout(() => setMensaje(""), 2000);
  };

  const calcularTotales = () => {
    const ingresos = movimientosFiltrados
      .filter(m => m.tipo === 'ingreso')
      .reduce((sum, m) => sum + m.monto, 0);
    
    const gastos = movimientosFiltrados
      .filter(m => m.tipo === 'gasto')
      .reduce((sum, m) => sum + m.monto, 0);
    
    return { ingresos, gastos, balance: ingresos - gastos };
  };

  const totales = calcularTotales();
  const hayFiltrosActivos = busqueda || filtroCategoria !== "todas" || filtroTipo !== "todos" || 
                           filtroFechaDesde || filtroFechaHasta || filtroMontoMin || filtroMontoMax;

  if (cargando) {
    return (
      <div className="cargando-container">
        <p className="cargando-texto">Cargando tus movimientos...</p>
      </div>
    );
  }

  return (
    <div className="listado-container">
      {/* Mensaje flotante */}
      {mensaje && (
        <div className="mensaje-flotante mensaje-exito">
          {mensaje}
        </div>
      )}


      {/* Filtros Unificados */}
      <div className="filtros-unificados">
        <div className="filtros-grid">
          {/* Búsqueda por texto */}
          <div className="filtro-grupo">
            <label>BUSCAR DESCRIPCIÓN</label>
            <input
              type="text"
              placeholder="Buscar por descripción"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="input-filtro"
            />
          </div>

          {/* Filtro por categoría */}
          <div className="filtro-grupo">
            <label>CATEGORÍA</label>
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
          </div>

          {/* Filtro por tipo */}
          <div className="filtro-grupo">
            <label>TIPO</label>
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

          {/* Filtro fecha desde */}
          <div className="filtro-grupo">
            <label>FECHA DESDE</label>
            <input
              type="date"
              value={filtroFechaDesde}
              onChange={(e) => setFiltroFechaDesde(e.target.value)}
              className="input-filtro"
            />
          </div>

          {/* Filtro fecha hasta */}
          <div className="filtro-grupo">
            <label>FECHA HASTA</label>
            <input
              type="date"
              value={filtroFechaHasta}
              onChange={(e) => setFiltroFechaHasta(e.target.value)}
              className="input-filtro"
            />
          </div>

          {/* Filtro monto mínimo */}
          <div className="filtro-grupo">
            <label>MONTO MÍNIMO</label>
            <input
              type="number"
              placeholder="0"
              value={filtroMontoMin}
              onChange={(e) => setFiltroMontoMin(e.target.value)}
              className="input-filtro"
              min="0"
            />
          </div>

          {/* Filtro monto máximo */}
          <div className="filtro-grupo">
            <label>MONTO MÁXIMO</label>
            <input
              type="number"
              placeholder="666999"
              value={filtroMontoMax}
              onChange={(e) => setFiltroMontoMax(e.target.value)}
              className="input-filtro"
              min="0"
            />
          </div>

          {/* Botón limpiar filtros */}
          <div className="filtro-grupo filtro-acciones">
            <label>&nbsp;</label>
            <button
              className="boton-limpiar"
              onClick={limpiarFiltros}
              disabled={!hayFiltrosActivos}
            >
              LIMPIAR FILTROS
            </button>
          </div>
        </div>
      </div>

      {/* Resumen de Resultados */}
      {movimientos.length > 0 && (
        <div className="resumen-filtros">
          <div className="resumen-info">
            <p>
              Mostrando <strong>{movimientosFiltrados.length}</strong> de <strong>{movimientos.length}</strong> movimientos
              {busqueda && ` para "${busqueda}"`}
              {filtroCategoria !== "todas" && ` en ${obtenerNombreCategoria(filtroCategoria)}`}
              {filtroTipo !== "todos" && ` (${filtroTipo === 'ingreso' ? 'Ingresos' : 'Gastos'})`}
            </p>
          </div>
          
          <div className="totales-rapidos">
            <span className="tooltip total-rapido">
              Ingresos: ${totales.ingresos.toLocaleString('es-AR')}
              <span className="tooltip-texto">Total de ingresos filtrados</span>
            </span>
            <span className="tooltip total-rapido">
              Gastos: ${totales.gastos.toLocaleString('es-AR')}
              <span className="tooltip-texto">Total de gastos filtrados</span>
            </span>
            <span className={`tooltip total-rapido ${totales.balance >= 0 ? 'balance-positivo' : 'balance-negativo'}`}>
              Balance: ${totales.balance.toLocaleString('es-AR')}
              <span className="tooltip-texto">Balance filtrado</span>
            </span>
          </div>
        </div>
      )}

      {/* Listado de Movimientos */}
      {movimientos.length === 0 ? (
        <div className="estado-vacio">
          <h2 className="estado-vacio-titulo">No hay movimientos registrados</h2>
          <p className="estado-vacio-descripcion">
            Comenza a registrar tus ingresos y gastos para llevar el control de tu presupuesto personal.
          </p>
          <button 
            className="boton-accion-principal"
            onClick={() => navigate('/nuevo')}
          >
            Crear Primer Movimiento
          </button>
        </div>
      ) : movimientosFiltrados.length === 0 ? (
        <div className="estado-vacio">
          <div className="estado-vacio-icono"></div>
          <h2 className="estado-vacio-titulo">No se encontraron movimientos</h2>
          <p className="estado-vacio-descripcion">
            {hayFiltrosActivos 
              ? "No hay movimientos que coincidan con los filtros aplicados. Proba modificando los criterios de busqueda."
              : "No hay movimientos registrados que cumplan con los criterios actuales."
            }
          </p>
          {hayFiltrosActivos && (
            <button 
              className="boton-accion-principal"
              onClick={limpiarFiltros}
            >
              Limpiar Filtros
            </button>
          )}
          <button 
            className="boton-accion-secundario"
            onClick={() => navigate('/nuevo')}
          >
            Agregar Nuevo Movimiento
          </button>
        </div>
      ) : (
        <div className="lista-movimientos">
          {movimientosFiltrados.map((mov) => (
            <div key={mov.id} className={`movimiento-item ${mov.tipo}`}>
              <div className="mov-info">
                <h3 className="mov-descripcion">{mov.descripcion}</h3>
                <p className="mov-categoria">
                  {obtenerNombreCategoria(mov.categoria)}
                </p>
                <p className="mov-fecha">
                  {new Date(mov.fecha).toLocaleDateString('es-AR')}
                </p>
                <div className="acciones">
                  <button
                    className="btn-editar tooltip"
                    onClick={() => navigate(`/editar/${mov.id}`)}
                  >
                    Editar
                    <span className="tooltip-texto">Modificar este movimiento</span>
                  </button>
                  <button
                    className="btn-eliminar tooltip"
                    onClick={() => manejarEliminar(mov.id, mov.descripcion)}
                  >
                    Eliminar
                    <span className="tooltip-texto">Eliminar permanentemente</span>
                  </button>
                </div>
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Listado;