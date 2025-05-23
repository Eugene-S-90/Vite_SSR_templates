import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import useStore from './store'

// Initialize store data from server
const initializeData = () => {
  const dataScript = document.getElementById('__INITIAL_DATA__')
  if (dataScript) {
    try {
      const data = JSON.parse(dataScript.textContent || '{}')
      // Initialize store with server data
      useStore.setState({
        serverTime: data.serverTime,
        message: data.serverData.message,
        items: data.serverData.items
      })
      // Remove the script tag immediately
      dataScript.parentNode?.removeChild(dataScript)
    } catch (error) {
      console.error('Failed to parse initial data:', error)
    }
  }
}

// Initialize data before hydration
initializeData()

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
