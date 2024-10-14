import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import FuzzyClock from './FuzzyClock.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FuzzyClock />
  </StrictMode>,
)
