import { useEffect, useState } from "react";
import "./Tema.css";

function Tema() {
  const [modoOscuro, setModoOscuro] = useState(
    localStorage.getItem("modoOscuro") === "true"
  );

  useEffect(() => {
    document.body.setAttribute("data-theme", modoOscuro ? "dark" : "light");
    localStorage.setItem("modoOscuro", modoOscuro);
  }, [modoOscuro]);

  return (
    <button
      className="boton-tema"
      onClick={() => setModoOscuro(!modoOscuro)}
    >
      {modoOscuro ? "🌙 Oscuro" : "☀️ Claro"}
    </button>
  );
}

export default Tema;