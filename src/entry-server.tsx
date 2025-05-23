import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App'

// Mock data for each route
const routeData = {
  '/': {
    homeData: {
      title: 'Welcome to Our Platform',
      welcomeMessage: 'Discover amazing features and products',
      stats: {
        visitors: 1234,
        activeUsers: 567
      }
    },
    products: [],
    settings: { theme: 'light', notifications: true, language: 'English' },
    serverData: `Home page rendered on server at ${new Date().toISOString()}`
  },
  '/products': {
    homeData: {
      title: '',
      welcomeMessage: '',
      stats: { visitors: 0, activeUsers: 0 }
    },
    products: [
      { id: 1, name: 'Product 1', price: 99.99 },
      { id: 2, name: 'Product 2', price: 149.99 },
      { id: 3, name: 'Product 3', price: 199.99 }
    ],
    settings: { theme: 'light', notifications: true, language: 'English' },
    serverData: `Products list fetched from server at ${new Date().toISOString()}`
  },
  '/settings': {
    homeData: {
      title: '',
      welcomeMessage: '',
      stats: { visitors: 0, activeUsers: 0 }
    },
    products: [],
    settings: {
      theme: 'light',
      notifications: true,
      language: 'English'
    },
    serverData: `Settings loaded from server at ${new Date().toISOString()}`
  }
}

export function render(url: string) {
  // Normalize the URL to match our route data keys
  const normalizedUrl = url === '' ? '/' : url.startsWith('/') ? url : `/${url}`

  
  // Get the matching route data or fallback to home
  const matchedData = routeData[normalizedUrl as keyof typeof routeData] || routeData['/']


  const html = renderToString(
    <StrictMode>
      <StaticRouter location={normalizedUrl}>
        <App initialProps={matchedData} />
      </StaticRouter>
    </StrictMode>
  )
  
  return { 
    html,
    initialProps: matchedData
  }
}
