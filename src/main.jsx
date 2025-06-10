import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ContextShare from './context/ContextShare.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter> 
  <GoogleOAuthProvider clientId='349075373266-5thhamhsbtm85nu7b7jq2kp341av7hp4.apps.googleusercontent.com'> 
   <ContextShare> <App /></ContextShare>
  </GoogleOAuthProvider>
   </BrowserRouter>
  </StrictMode>,
)
