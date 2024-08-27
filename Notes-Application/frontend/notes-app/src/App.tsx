import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/templates/home'
import { ThemeProvider } from './components/theme-provider'
import { RouterProvider } from 'react-router-dom'
import router from './routes'

function App() {
  return (
    /*<>
      <Home/>
    </>*/
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
