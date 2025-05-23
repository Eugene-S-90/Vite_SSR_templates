import { type StateCreator } from 'zustand/vanilla'
import { create } from 'zustand'

// Define the store state type
interface StoreState {
  count: number
  lastSync: number,
  serverTime: string,
  timeDrift: number
  isAutoIncrementing: boolean
  message?: string
  items?: any[]
  serverData: {
    message: string
    items: any[]
  }
  // Actions
  incrementCount: () => void
  startAutoIncrement: () => void
  stopAutoIncrement: () => void
  checkTimeSync: () => Promise<void>
}

// Create the store creator
const createStoreState: StateCreator<StoreState> = (set, get) => ({
  // Initial state
  count: 0,
  lastSync: Date.now(),
  timeDrift: 0,
  isAutoIncrementing: false,
  serverTime:'',
  message: undefined,
  items: [],
  serverData: {
    message: '',
    items: []
  },

  // Actions
  incrementCount: () => set((state) => ({ count: state.count + 1 })),
  
  startAutoIncrement: () => {
    const state = get()
    if (!state.isAutoIncrementing) {
      set({ isAutoIncrementing: true })
      
      // Start the interval
      const intervalId = setInterval(() => {
        const currentState = get()
        set({ count: currentState.count + 1 })
        
        // Check time sync every 10 seconds
        const timeSinceLastSync = Date.now() - currentState.lastSync
        if (timeSinceLastSync >= 10000) {
          get().checkTimeSync()
        }
      }, 1000)

      // Store the interval ID in window for cleanup
      window.__COUNTER_INTERVAL__ = intervalId as unknown as number
    }
  },

  stopAutoIncrement: () => {
    set({ isAutoIncrementing: false })
    if (window.__COUNTER_INTERVAL__) {
      clearInterval(window.__COUNTER_INTERVAL__ as unknown as NodeJS.Timeout)
      delete window.__COUNTER_INTERVAL__
    }
  },

  checkTimeSync: async () => {
    try {
      const response = await fetch('/api/server-time')
      if (!response.ok) {
        const text = await response.text()
        console.error('Server response:', text)
        throw new Error(`Failed to sync time: ${response.status} ${response.statusText}`)
      }
      
      const data = await response.json()
      const clientTime = Date.now()
      const serverTime = data.serverTime
      const drift = Math.abs(clientTime - serverTime)

      set({ 
        lastSync: clientTime,
        timeDrift: drift,
      })

      // Log time drift for debugging
      console.log(`Time drift: ${drift}ms`)
      
      // Optionally adjust count if drift is too large
      if (drift > 1000) { // More than 1 second drift
        console.warn('Significant time drift detected:', drift, 'ms')
      }
    } catch (error) {
      console.error('Time sync failed:', error)
      // Set a failed sync state
      set({ timeDrift: -1 }) // Use -1 to indicate sync failure
    }
  }
})

// Create the React hook version of the store
const useStore = create(createStoreState)

// Add type definition for the interval
declare global {
  interface Window {
    __COUNTER_INTERVAL__?: number
  }
}

export default useStore 