import { useSelector } from "react-redux"
import { useLocation, Navigate, Outlet } from "react-router-dom"



function CustomerProtectedRoute({ isLoading ,role="user"}) {
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
    if(user.role !== role){
        return <Navigate to="/admin" replace />
    }
    return (
        <Outlet/>
    )
}

export default CustomerProtectedRoute