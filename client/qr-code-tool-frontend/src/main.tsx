import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './components/Router'
import { QrCodeGenerationProvider } from './contexts/QrCodeGenerationContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QrCodeGenerationProvider>
      <Router />
    </QrCodeGenerationProvider>
  </StrictMode>,
)
