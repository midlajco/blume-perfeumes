import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

function AdminProtectedRoute({isLoading}) {
    const user =useSelector((state)=>state.auth.user);

    if(isLoading){
        return <p>Loading ...account</p>
    }
    if(!user){
        return <Navigate to="login" replace />
    }
    if(user.role !== "/"){
       
   return <Outlet/>
    }
}

export default AdminProtectedRoute