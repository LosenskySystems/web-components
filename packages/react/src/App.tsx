import { useState } from 'react'
import { Button, Input } from './index'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  return (
    <>
      <div>
        <h1>React Wrapper Components</h1>
      </div>
      
      <div className="card">
        <h2>Button Component</h2>
        <Button onClick={() => setCount((count) => count + 1)}>
          Count is {count}
        </Button>
        
        <Button variant="secondary" onClick={() => setCount(0)}>
          Reset Counter
        </Button>
        
        <Button disabled>
          Disabled Button
        </Button>
      </div>

      <div className="card">
        <h2>Input Component</h2>
        <Input 
          placeholder="Enter some text..."
          value={inputValue}
          onChange={handleInputChange}
        />
        
        <Input 
          type="email"
          placeholder="Enter your email"
        />
        
        <Input 
          placeholder="Disabled input"
          disabled
        />
        
        <p>You typed: {inputValue}</p>
      </div>
    </>
  )
}

export default App