import React, { useEffect } from 'react'
import Home from './pages/Home'
import Navbar from './components/layout/Navbar'
import { useState } from 'react'

import { Routes, Route, useLocation } from 'react-router-dom'
import Shop from './pages/Shop'
import ProductDetails from './pages/ProductDetails'
import Register from './pages/Register'
import Login from './pages/Login'
import { useQuery } from '@tanstack/react-query'
import { getUserById } from './services/UserService'

import { login } from './redux/authSlice'
import { useDispatch } from 'react-redux'

import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import Orders from './pages/Orders'
import Checkout from './pages/Checkout'
import { Toaster } from 'sonner'

import Dashboard from "./admin/pages/Dashboard"
import CustomerProtectedRoute from './components/routes/CustomerProtectedRoute'
import AdminProtecetdRoute from './components/routes/AdminProtecetdRoute'

import PublicRoutes from './components/routes/PublicRoutes'
import GuestRoutes from './components/routes/GuestRoutes'
import Userlayout from './components/layout/Userlayout'
import AdminLayout from './admin/layouts/AdminLayout';

import AdminProducts from './admin/pages/AdminProducts';
import AdminOrders from './admin/pages/AdminOrders';
import AdminUsers from './admin/pages/AdminUsers'
import ProductTrash from './admin/components/ProductTrash'
import NewProduct from './admin/components/NewProduct'
import AdminOrderDetails from './admin/components/AdminOrderDetails'



function App() {

  const location = useLocation();



  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const [authReady, setAuthReady] = useState(!userId);


  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: ["currentuser", userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,


  })


  useEffect(() => {
    if (isUserLoading) return;

    if (user) {
      dispatch(login({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      }));
    }

    setAuthReady(true);
  }, [user, isUserLoading, dispatch]);


  return (
    <div>
      <Toaster position="top-right" richColors closeButton />
      
      <Routes>


        <Route element={<Userlayout />}>

          {/* public */}
          <Route element={<PublicRoutes isLoading={!authReady} />} >
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/products/:id" element={<ProductDetails />} />
          </Route>

          {/* guestOnly */}
          <Route element={<GuestRoutes isLoading={!authReady} />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* customeronly */}
          <Route element={<CustomerProtectedRoute isLoading={!authReady} guestOnly={false} role={"user"} />} >
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/checkout" element={<Checkout />} />

          </Route>


        </Route>



        <Route element={<AdminProtecetdRoute isLoading={!authReady} role={"admin"} />} >
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<AdminProducts/>}  />
            <Route path="orders" element={<AdminOrders/>}  />
            <Route path="users" element={<AdminUsers/>}  />
            <Route path="trash" element={<ProductTrash/>}  />
            <Route path="newProduct" element={<NewProduct/>}  />
            <Route path="editProduct/:id" element={<NewProduct/>}  />
            <Route path="orders/:id" element={<AdminOrderDetails/>}  />

          </Route>


        </Route>

 
      </Routes>

    </div>
  )
}

export default App