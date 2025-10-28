import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './theme.css'
import App from './App.tsx'
import '@losensky-systems/web-components-tailwindcss/dist/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
