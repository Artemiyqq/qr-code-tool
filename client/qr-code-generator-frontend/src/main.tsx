import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './components/Router'
import { QrCodeProvider } from './contexts/QrCodeContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QrCodeProvider>
      <Router />
    </QrCodeProvider>
  </StrictMode>,
)
