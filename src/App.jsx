import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Chat from './pages/Chat'

import "./styles/base.css"

import AppLayout from './Layouts/AppLayout'
import Behavior from './pages/Behavior'

function App() {
 

  return (
    <>
     
      <Routes>
        <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/behavior" element={<Behavior />} />
      
        </Route>
      </Routes>
     
    </>
  )
}

export default App
