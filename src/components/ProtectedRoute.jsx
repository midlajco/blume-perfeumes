import { useSelector } from "react-redux"
import { useLocation ,Navigate} from "react-router-dom"



function ProtectedRoute() {
    const location =useLocation();
    const user =useSelector((state)=>state.auth.user)

    if (!user){
        return  <Navigate   to="login"
        replace
        state={{from:location}}/>
    }
  return (
    <div>
    </div>
  )
}

export default ProtectedRoute