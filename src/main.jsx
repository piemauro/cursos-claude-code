import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles/index.css'

const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

// skin v2 (liquid glass) ativada em build com VITE_SKIN=v2
if (import.meta.env.VITE_SKIN === 'v2') document.documentElement.classList.add('v2')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
