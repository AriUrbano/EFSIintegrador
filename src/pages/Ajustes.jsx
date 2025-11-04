import React from "react";
import { useTema } from "../context/TemaContext";
import Tema from "../components/Tema";
import { useAlmacenamientoMovimientos } from "../hooks/useLocalStorage";
import "./Ajustes.css";

const Ajustes = () => {
  const { limpiarMovimientos } = useAlmacenamientoMovimientos();
  const { modoOscuro } = useTema();

  const manejarLimpiarDatos = () => {
    if (window.confirm("¿Seguro que querés borrar todos los movimientos guardados?")) {
      limpiarMovimientos();
      alert("✅ Datos eliminados correctamente.");
    }
  };

  return (
    <div className="ajustes-contenedor">
      <h1 className="titulo-ajustes">⚙️ Ajustes</h1>

      <div className="seccion-ajuste">
        <h3>Tema visual</h3>
        <p>Alternar entre modo claro y oscuro.</p>        
        <Tema />
      </div>

      <hr className="separador-ajustes" />

      <div className="seccion-ajuste">
        <h3>Datos guardados</h3>
        <p>Eliminar todos los movimientos almacenados localmente.</p>
        <button className="boton-eliminar-datos" onClick={manejarLimpiarDatos}>
          🗑️ Borrar todos los datos
        </button>
      </div>
    </div>
  );
};

export default Ajustes;