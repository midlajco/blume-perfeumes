import { useSelector } from "react-redux"
import {  Navigate, Outlet } from "react-router-dom"



function PublicRoutes({isLoading}) {

   const user = useSelector((state) => state.auth.user)
   if(isLoading){
    return <p>Loading...</p>
   }

   if(user?.role === "admin"){
        return <Navigate to="/admin" replace />
    }
    return (
        <Outlet/>
    )
}

export default PublicRoutes