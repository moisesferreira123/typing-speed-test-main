import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './pages/Home/Home'
import TestComplete from './pages/TestComplete/TestComplete'
import HighScoreSmashed from './pages/HighScoreSmashed/HighScoreSmashed'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HighScoreSmashed />
  </StrictMode>,
)
