import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from 'react-dom/client';
import React from 'react';
import { App } from './app/App';
import { Provider } from 'react-redux';
import { store } from './app/model/store';

const root = createRoot(document.getElementById('root')!)
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
