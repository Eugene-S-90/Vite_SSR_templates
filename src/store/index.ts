import { type StateCreator } from 'zustand/vanilla'
import { create } from 'zustand'

// Define the store state type
interface StoreState {
  serverTime: string
  message: string
  items: string[]
  count: number
  // Actions
  setCount: (count: number) => void
  incrementCount: () => void
}

// Create the store creator
const createStoreState: StateCreator<StoreState> = (set) => ({
  // Initial state
  serverTime: '',
  message: '',
  items: [],
  count: 0,

  // Actions
  setCount: (count) => set({ count }),
  incrementCount: () => set((state) => ({ count: state.count + 1 }))
})

// Create the React hook version of the store
const useStore = create(createStoreState)

export default useStore 