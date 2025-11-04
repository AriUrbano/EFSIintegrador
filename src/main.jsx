import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppProvider } from './context/AppContext';
import { TemaProvider } from './context/TemaContext';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TemaProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </TemaProvider>
  </React.StrictMode>
);