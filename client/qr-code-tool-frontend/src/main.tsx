import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from './components/Router'
import { QrCodeGenerationProvider } from './contexts/QrCodeGenerationContext'
import { QrCodeScanningProvider } from './contexts/QrCodeScanningContext'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QrCodeGenerationProvider>
      <QrCodeScanningProvider>
        <Router />
      </QrCodeScanningProvider>
    </QrCodeGenerationProvider>
  </StrictMode>,
)