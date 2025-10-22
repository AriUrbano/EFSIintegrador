import { useEffect, useState } from "react";
import "./Tema.css";

function Tema() {
  const [modoOscuro, setModoOscuro] = useState(
    () => localStorage.getItem("modoOscuro") === "true"
  );

  useEffect(() => {
    if (modoOscuro) {
      document.body.classList.add("modo-oscuro");
      document.body.classList.remove("modo-claro");
    } else {
      document.body.classList.add("modo-claro");
      document.body.classList.remove("modo-oscuro");
    }
    localStorage.setItem("modoOscuro", modoOscuro);
  }, [modoOscuro]);

  return (
    <button
      className="boton-tema"
      onClick={() => setModoOscuro(!modoOscuro)}
    >
      {modoOscuro ? "Oscuro" : "Claro"}
    </button>
  );
}

export default Tema;