import { useState } from 'react'

const MockChildComponent = () => {

    const [count, setCount] = useState(0)
    if (import.meta.env.SSR) return null; // Don't render during SSR
    return <div>
        Render's only on client,html not rendered on server
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <p>Count: {count}</p>
    </div>
}

export default MockChildComponent