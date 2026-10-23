import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

function AdminProtecetdRoute({ isLoading ,role}) {
    const location = useLocation();
    const user = useSelector((state) => state.auth.user)
  if (isLoading){
    return <p>Loading......</p>
  }
 
  if (!user) {
        return <Navigate to="/login"
            replace
            state={{ from: location }} />
    }
   if(user.role !== role){
    return <Navigate to="/" replace />
   } 
   return <Outlet/>
}

export default AdminProtecetdRoute