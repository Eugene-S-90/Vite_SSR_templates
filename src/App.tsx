import './App.css'
import reactLogo from './assets/react.svg'
import MockChildComponent from './components/mockChildComponent'
import useStore from './store'
import { useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'
function App() {
  // Subscribe to store updates
  const {
    count,
    timeDrift,
    lastSync,
    serverTime,
    serverData,
    isAutoIncrementing,
    startAutoIncrement,
    stopAutoIncrement
  } = useStore(useShallow((state) => ({
    count: state.count,
    timeDrift: state.timeDrift,
    lastSync: state.lastSync,
    serverTime: state.serverTime,
    serverData: state.serverData,
    isAutoIncrementing: state.isAutoIncrementing,
    startAutoIncrement: state.startAutoIncrement,
    stopAutoIncrement: state.stopAutoIncrement
  })))

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAutoIncrement()
    }
  }, [stopAutoIncrement])

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

      {/* Display sync status */}
      <div className="sync-status">
        <h2>Time Sync Status:</h2>
        <p>Server time: {serverTime}</p>
        {timeDrift === -1 ? (
          <p style={{ color: 'red' }}>Time sync failed! Check console for details.</p>
        ) : (
          <>
            <p>Time Drift: {timeDrift}ms</p>
            <p>Last Sync: {new Date(lastSync).toLocaleTimeString()}</p>
          </>
        )}
      </div>

      <div className="card">
        <button onClick={() => isAutoIncrementing ? stopAutoIncrement() : startAutoIncrement()}>
          {isAutoIncrementing ? 'Stop' : 'Start'} Auto Increment
        </button>
        <p>Count: {count}</p>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p>serverData: {serverData.message}</p>
      <div>serverData: {serverData.items.map(el => <p key={el}>{el}</p>)}</div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <MockChildComponent />
    </>
  )
}

export default App
