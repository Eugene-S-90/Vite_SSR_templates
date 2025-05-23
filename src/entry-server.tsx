import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'

export function render(_url: string) {
  // Example server-side data
  const initialProps = {
    serverTime: new Date().toISOString(),
    serverData: {
      message: 'Hello from server!',
      items: ['Item 1', 'Item 2', 'Item 3']
    }
  }

  const html = renderToString(
    <StrictMode>
      <App initialProps={initialProps} />
    </StrictMode>,
  )
  
  // Return both HTML and initial props
  return { 
    html,
    initialProps 
  }
}
