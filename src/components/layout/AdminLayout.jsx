import React from 'react'
import Adminnav from './Adminnav'
import { Outlet } from 'react-router-dom'

function AdminLayout() {
  return (
    <>
    <Adminnav/>
    <main>
        <Outlet/>
    </main>
    </>
  )
}

export default AdminLayout