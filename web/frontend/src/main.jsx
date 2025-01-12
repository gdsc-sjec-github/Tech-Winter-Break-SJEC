import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ModalProvider } from './components/ModelContext.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ModalProvider>
      <App />
    </ModalProvider>
  </StrictMode>,
)
