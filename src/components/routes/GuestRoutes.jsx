import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";


function GuestRoutes({isLoading}) {
    const user = useSelector((state) => state.auth.user);
        if (isLoading) {
    return <p>Loading...</p>;
  }
  if(user){
    if(user.role ==="admin"){
        return <Navigate to="/admin" replace />
    }
    return <Navigate to="/" replace />
  }


  return (
    <Outlet/>
  )
}

export default GuestRoutes