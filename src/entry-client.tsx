import './index.css'
import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import App from './App'

// Get the initial props from the window object
declare global {
  interface Window {
    __INITIAL_PROPS__?: any;
  }
}

const initialProps = window.__INITIAL_PROPS__;

hydrateRoot(
  document.getElementById('root')!,
  <StrictMode>
    <App initialProps={initialProps} />
  </StrictMode>,
)
