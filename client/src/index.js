import App from './App';
import React from 'react';
import store from './redux/store';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode> {/* https://stackoverflow.com/questions/62185425/ */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);