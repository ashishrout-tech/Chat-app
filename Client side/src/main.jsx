import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-njc2p3kptpkj5wpn.us.auth0.com"
      clientId="m94c59S6voj7R4FDmN5W6UYExeqozleZ"
      authorizationParams={{
        redirect_uri: 'http://localhost:5173/',
        audience: 'unique Identifier backend',
        scope: 'openid profile email'
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
)
