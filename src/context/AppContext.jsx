import React, { createContext, useContext } from 'react';
import { useAlmacenamientoMovimientos } from '../hooks/useLocalStorage';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp debe usarse dentro de AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const almacenamientoMovimientos = useAlmacenamientoMovimientos();

  const valor = {
    ...almacenamientoMovimientos
  };

  return (
    <AppContext.Provider value={valor}>
      {children}
    </AppContext.Provider>
  );
};