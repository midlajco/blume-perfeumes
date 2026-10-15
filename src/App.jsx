import React from 'react'
import Home from './pages/Home'
import Navbar from './components/layout/Navbar'

import { Routes,Route } from 'react-router-dom'
import Shop from './pages/Shop'
import ProductDetails from './pages/ProductDetails'

function App() {
  
  return (
    <div>
      <Navbar/>
     <Routes>
        <Route path="/"  element={<Home/>} />
        <Route path="/shop"  element={<Shop/>} />
        <Route path="/products/:id"  element={<ProductDetails/>} />
     </Routes>
      
    </div>
  )
}

export default App