import './App.css'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Home from './routes/Home'
import Products from './routes/Products'
import Settings from './routes/Settings'

// Define types for route-specific data
interface RouteData {
  homeData: {
    title: string;
    welcomeMessage: string;
    stats: {
      visitors: number;
      activeUsers: number;
    };
  };
  products: {
    id: number;
    name: string;
    price: number;
  }[];
  settings: {
    theme: string;
    notifications: boolean;
    language: string;
  };
  serverData: string;
}

interface AppProps {
  initialProps: RouteData;
}

function App({ initialProps }: AppProps) {
  const location = useLocation();
  const [currentProps, setCurrentProps] = useState<RouteData>(initialProps);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchServerData = async () => {
      setIsLoading(true);
      try {
        // Fetch fresh data from server for the current route
        const response = await fetch(location.pathname, {
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setCurrentProps(data);
        }
      } catch (error) {
        console.error('Failed to fetch server data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // fetchServerData();
  }, [location.pathname]);

  return (
    <div className="app">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/settings">Settings</Link>
      </nav>

      <main>
        <div className="server-info">
          {isLoading ? (
            <div className="loading">Loading fresh data from server...</div>
          ) : (
            <>
              <strong>Server Data:</strong> {currentProps.serverData}
            </>
          )}
        </div>
        <Routes>
          <Route index element={<Home homeData={currentProps.homeData} />} />
          <Route path="products" element={<Products products={currentProps.products} />} />
          <Route path="settings" element={<Settings settings={currentProps.settings} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
