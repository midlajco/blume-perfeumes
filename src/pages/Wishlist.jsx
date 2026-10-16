import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux"
import { getWishList } from "../services/WishlistService";


function Wishlist() {
  const user =useSelector((state)=>state.auth.user);
  if (user){
    const {data:wishlist,isLoading}=useQuery({
      queryKey:["wishlist",user?.id],
      queryFn:()=>getWishList(user.id),
      enabled:!!user?.id,
    })
  }

  return (
    <div className="mt-50w">Wishlist</div>
  )
}

export default Wishlist