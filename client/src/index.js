import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode> {/* https://stackoverflow.com/questions/62185425/ */}
    <App />
  </React.StrictMode>
);