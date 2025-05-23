import './App.css'
import { useState } from 'react'
import reactLogo from './assets/react.svg'

// Define the type for our initial props
interface InitialProps {
  serverTime: string;
  serverData: {
    message: string;
    items: string[];
  };
}

interface AppProps {
  initialProps?: InitialProps;
}

function App({ initialProps }: AppProps) {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      
      {/* Display server-side data */}
      {initialProps && (
        <div className="server-data">
          <h2>Server Data:</h2>
          <p>Server Time: {initialProps.serverTime}</p>
          <p>Message: {initialProps.serverData.message}</p>
          <ul>
            {initialProps.serverData.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
