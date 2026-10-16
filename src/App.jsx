import React, { useEffect } from 'react'
import Home from './pages/Home'
import Navbar from './components/layout/Navbar'
import { useState } from 'react'

import { Routes,Route } from 'react-router-dom'
import Shop from './pages/Shop'
import ProductDetails from './pages/ProductDetails'
import Register from './pages/Register'
import Login from './pages/Login'
import { useQuery } from '@tanstack/react-query'
import { getUserById } from './services/UserService'

import { login } from './redux/authSlice'
import { useDispatch } from 'react-redux'
import ProtectedRoute from './components/ProtectedRoute'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import Orders from './pages/Orders'
import Checkout from './pages/Checkout'


function App() {

  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const [authReady, setAuthReady] = useState(!userId);


  const {data:user,isLoading:isUserLoading} =useQuery({
    queryKey:["currentuser",userId],
    queryFn:()=>getUserById(userId),
    enabled:!!userId,


  })


useEffect(() => {
  if (isUserLoading) return;

  if (user) {
    dispatch(login({
      id: user.id,
      name: user.name,
      email: user.email,
    }));
  }

  setAuthReady(true);
}, [user, isUserLoading, dispatch]);

 
  return (
    <div>
      <Navbar/>
     <Routes>

        <Route path="/"  element={<Home/>} />
        <Route path="/shop"  element={<Shop/>} />
        <Route path="/products/:id"  element={<ProductDetails/>} />
        <Route path="/register"  element={<Register/>} />
        <Route path="/login"  element={<Login/>} />
       <Route element={<ProtectedRoute  isLoading={!authReady} />} >
            <Route path="/cart" element={<Cart/>}  />
            <Route path="/wishlist" element={<Wishlist/>}  />
            <Route path="/orders" element={<Orders/>}  />
            <Route path="/checkout" element={<Checkout/>}  />
            
       </Route>

       
     </Routes>
      
    </div>
  )
}

export default App