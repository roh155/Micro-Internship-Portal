import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* AuthProvider gives login data to the whole app */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);