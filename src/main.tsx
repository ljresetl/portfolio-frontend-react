import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { HelmetProvider } from "react-helmet-async"; // метаопис
import App from './components/App/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* ✅ Обгортаємо весь додаток HelmetProvider */}
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)
