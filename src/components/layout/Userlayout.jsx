import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

function Userlayout() {
  return(
    <>
    <Navbar/>
    <main>
        <Outlet/>
    </main>
    </>
  )
}

export default Userlayout