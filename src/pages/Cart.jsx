import { useQuery } from "@tanstack/react-query"
import { useSelector } from "react-redux"
import { getCart } from "../services/CartService"
import { Link } from "lucide-react"

function Cart() {
  const user = useSelector((state) => state.auth.user)

  const { data: cart, isLoading, isError } = useQuery({
    queryKey: ["cart", user.id],
    queryFn: () => getCart(user.id),
    enabled: !!user
  })
  if (isLoading) return <p>Loading Cart...</p>;

  if (isError) return <p>Failed to load Cart.</p>;
    
  const items =cart?.items;

   if (items.length === 0) {
    return <p className="mt-50 text-center">Your Cart is empty.</p>;
  }
  <Link to="/shop" > Shop More</Link>

  return (
    <div className="mt-50" >
        {
          items.map((item)=>(
            <div  key={item.id}>{item.name}</div>
          ))
        }
    </div>
  )
}

export default Cart