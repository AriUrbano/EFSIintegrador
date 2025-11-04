import { useTema } from '../context/TemaContext';
import "./Tema.css";

function Tema() {
  const { modoOscuro, toggleTema } = useTema();

  return (
    <button
      className="boton-tema"
      onClick={toggleTema}
    >
      {modoOscuro ? "OSCURO" : "CLARO"}
    </button>
  );
}

export default Tema;