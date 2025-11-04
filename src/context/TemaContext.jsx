import React, { createContext, useContext, useState, useEffect } from 'react';

const TemaContext = createContext();

export const useTema = () => {
  const context = useContext(TemaContext);
  if (!context) {
    throw new Error('useTema debe ser usado dentro de un TemaProvider');
  }
  return context;
};

export const TemaProvider = ({ children }) => {
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

  const toggleTema = () => {
    setModoOscuro(!modoOscuro);
  };

  const value = {
    modoOscuro,
    toggleTema,
    setModoOscuro
  };

  return (
    <TemaContext.Provider value={value}>
      {children}
    </TemaContext.Provider>
  );
};