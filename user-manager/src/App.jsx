import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserDetail from './pages/UserDetail'
import UserList from './pages/UserList'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserRegistration from './pages/UserRegistration'
import NotFound from './pages/NotFound'

function App() {
  const users = [
    { img:'https://storage.googleapis.com/cdn.media.bluedot.so/bluedot.thecore/2025/04/aswg8a_202504190306.png',
        id: '1', name: '황인태', age: 26, isOnline: true },
    { img:'https://storage.googleapis.com/cdn.media.bluedot.so/bluedot.thecore/2025/04/oia7ak_202504190307.png',
        id: '2', name: '이주찬', age: 26, isOnline: false },
    { img:'https://i.namu.wiki/i/enYCzF2cYTCCiMgde_ewP2mEfFY66_YI9jXpO0mSQym6sOhdGoiYry4XKUxLNsXblRDPl5QaxiL3ACU_ZQVgWA.webp',
      id: '3', name: '전진영', age: 25, isOnline: true },
    { img:'https://i.namu.wiki/i/FGrKOrMqLuvt20kKL4ZHrsQzwedUu5oMe_TB7RAyO8PQW6nERJPY5Fidkuyq86FEjI8FgPxdlI2pQCei589sfg.webp',
      id: '4', name: '김현아', age: 24, isOnline: false },
  ]

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<UserList users={users} />} />
        
        <Route path='/user/:id' element={<UserDetail users={users} />} />
        
        <Route path='/user' element={<UserRegistration />} />
        
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
