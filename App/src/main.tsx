import React from 'react'
import ReactDOM from 'react-dom/client'

import './globals.css'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRouter from './AppRouter'
import Auth0ProviderNavigate from './Auth/Auth0ProviderNavigate'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Auth0ProviderNavigate>
        <AppRouter />
      </Auth0ProviderNavigate>
      
    </Router>
  </React.StrictMode>,
)
