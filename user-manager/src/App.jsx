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
  const [users, setUsers] = useState([
  
  { img:'https://pimg.mk.co.kr/news/cms/202309/26/news-p.v1.20230926.96ae9f04144e4adc97068f5953e4f717_P1.jpg',
    id: '1', name: '강하늘', age: 36, isOnline: true },
{ img:'https://image.static.bstage.in/cdn-cgi/image/metadata=none,dpr=2,width=640/kissoflife/6e501541-e6c5-45fb-8374-d3c035dd4b5f/6d984c91-1a61-4ebd-8cb0-0a26227a65cf/ori.jpg',
    id: '2', name: '원하늘', age: 20, isOnline: false },
{ img:'https://img1.newsis.com/2020/06/25/NISI20200625_0000551541_web.jpg',
  id: '3', name: '하늘보리', age: 1, isOnline: false },
]);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<UserList users={users} />} />
        
        <Route path='/user/:id' element={<UserDetail users={users} setUsers={setUsers}/>} />
        
        <Route path='/user' element={<UserRegistration setUsers={setUsers} users={users}/>} />
        
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
