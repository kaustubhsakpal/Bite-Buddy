import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { StoreProvider } from './context/Storecontext.jsx'
import { ClerkProvider} from '@clerk/clerk-react'
import { ToastContainer } from 'react-toastify'
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

createRoot(document.getElementById('root')).render(
    <div className='min-h-screen  bg-linear-to-br from-rose-200 via-white to-orange-200'>
      <StoreProvider>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>  
      <BrowserRouter>
        <App /> 
      </BrowserRouter>
       <ToastContainer position="top-right" autoClose={2500} />
      </ClerkProvider>
      </StoreProvider>
    </div>

)
