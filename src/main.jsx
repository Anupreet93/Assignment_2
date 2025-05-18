import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Animation from './Components/Animation.jsx'
import ShaneWeberGallery from './Components/Shane_Weber.jsx'
import ManikaGallery from './Components/ManikaGallery.jsx'
import PanelPreview from './Components/PanelPreview.jsx'

createRoot(document.getElementById('root')).render(
   <StrictMode>
    <Animation />
    <ManikaGallery />
    <ShaneWeberGallery />
    <PanelPreview />
  </StrictMode>,
)
