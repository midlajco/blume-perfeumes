import React, { useEffect } from 'react'
import Home from './pages/Home'
import Navbar from './components/layout/Navbar'

import { Routes,Route } from 'react-router-dom'
import Shop from './pages/Shop'
import ProductDetails from './pages/ProductDetails'
import Register from './pages/Register'
import Login from './pages/Login'
import { useQuery } from '@tanstack/react-query'
import { getUserById } from './services/UserService'

import { login } from './redux/authSlice'
import { useDispatch } from 'react-redux'


function App() {

  const dispatch = useDispatch();
const userId = localStorage.getItem("userId");


  const {data:user} =useQuery({
    queryKey:["currentuser",userId],
    queryFn:()=>getUserById(userId),
    enabled:!!userId,


  })
  useEffect(()=>{
    
     if (user) {
        dispatch(login({
            id: user.id,
            name: user.name,
            email: user.email,
        }));}
  }, [user, dispatch])
  return (
    <div>
      <Navbar/>
     <Routes>
        <Route path="/"  element={<Home/>} />
        <Route path="/shop"  element={<Shop/>} />
        <Route path="/products/:id"  element={<ProductDetails/>} />
        <Route path="/register"  element={<Register/>} />
        <Route path="/login"  element={<Login/>} />
       
     </Routes>
      
    </div>
  )
}

export default App