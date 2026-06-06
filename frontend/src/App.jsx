import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Tools from './pages/Tools'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tools/:docId" element={<Tools />} />
      </Routes>
       <div className="min-h-screen flex items-center justify-center">
      <h1 className="font-display text-4xl font-bold" style={{color: 'var(--neon)'}}>
        Ismaran V2 — Working
      </h1>
    </div>
    </BrowserRouter>
  )
}

export default App
