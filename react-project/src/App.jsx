import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import About from './pages/About'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'
import Home from './pages/Home'

function App() {
  return (
    <BrowserRouter>
      <nav style={{marginBottom: 20}}>
        {/* Link : a태그와 동일한 역할을 하지만 react-router-dom을 활용해 spa방식으로 자연스럽게 화면전환 */}
        <Link to="/" style={{marginRight: 12}}>홈</Link>
        <Link to="/about" style={{marginRight: 12}}>소개</Link>
        <Link to="/profile/황인태">프로필</Link>
      </nav>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/profile/:username' element={<Profile />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
