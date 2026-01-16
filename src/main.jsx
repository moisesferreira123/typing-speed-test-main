import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './pages/Home/Home'
import TestComplete from './pages/TestComplete/TestComplete'
import HighScoreSmashed from './pages/HighScoreSmashed/HighScoreSmashed'
import BaselineEstabilished from './pages/BaselineEstabilished/BaselineEstabilished'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test-complete" element={<TestComplete />} />
        <Route path="/high-score-smashed" element={<HighScoreSmashed />} />
        <Route path="/baseline-estabilished" element={<BaselineEstabilished />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
