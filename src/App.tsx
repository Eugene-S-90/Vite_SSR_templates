import './App.css'
import reactLogo from './assets/react.svg'
import useStore from './store'
import { useShallow } from 'zustand/react/shallow'

function App() {
  // Subscribe to store updates
  const { count, serverTime, message, items, incrementCount } = useStore(useShallow((state) => ({
    count: state.count,
    serverTime: state.serverTime,
    message: state.message,
    items: state.items,
    incrementCount: state.incrementCount
  })))

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
      
      {/* Display store data */}
      <div className="server-data">
        <h2>Server Data:</h2>
        <p>Server Time: {serverTime}</p>
        <p>Message: {message}</p>
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="card">
        <button onClick={incrementCount}>
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
