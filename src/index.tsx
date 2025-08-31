import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from 'react-dom/client';
import React from 'react';
import { App } from './app/App';

const root = createRoot(document.getElementById('root')!)
root.render(<App />);
