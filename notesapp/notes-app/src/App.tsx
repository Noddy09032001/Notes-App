import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CreateNote from './components/Note'
import NoteLayout from './components/NoteLayout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <NoteLayout></NoteLayout>
      </div>
    </>
  )
}

export default App
