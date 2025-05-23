import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import useStore from './store'

export function render(_url: string) {
  // Example server-side data
  const initialProps = {
    serverTime: new Date().toISOString(),
    serverData: {
      message: 'Hello from server!',
      items: ['Item 1', 'Item 2', 'Item 3']
    }
  }

  // Initialize store with server data
  useStore.setState({
    serverTime: initialProps.serverTime,
    message: initialProps.serverData.message,
    items: initialProps.serverData.items,
    count: 0
  })

  const html = renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
  
  // Return both HTML and initial props for client hydration
  return { 
    html,
    initialProps 
  }
}
