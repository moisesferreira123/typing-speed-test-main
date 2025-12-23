import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import NotStarted from './pages/NotStarted/NotStarted.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NotStarted />
  </StrictMode>,
)
