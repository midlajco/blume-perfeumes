import { useSelector } from "react-redux"
import { useLocation, Navigate, Outlet } from "react-router-dom"



function CustomerProtectedRoute({ isLoading }) {
    const location = useLocation();
    const user = useSelector((state) => state.auth.user)

    if (isLoading) {
        return <p>Loading your account...</p>;
    }
   
    if (!user) {
        return <Navigate to="/login"
            replace
            state={{ from: location }} />
    }
    if(user.role !== "user"){
        return <Navigate to="/admin" replace />
    }
    return (
        <Outlet/>
    )
}

export default CustomerProtectedRoute