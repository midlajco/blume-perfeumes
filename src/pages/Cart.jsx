import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useSelector } from "react-redux"
import { getCart } from "../services/CartService"
import { Link } from "react-router-dom"
import { updateCart } from "../services/CartService"

function Cart() {
  const user = useSelector((state) => state.auth.user);
  const queryClient = useQueryClient();

  const { data: cart, isLoading, isError } = useQuery({
    queryKey: ["cart", user?.id],
    queryFn: () => getCart(user.id),
    enabled: !!user
  })
  const cartMutation = useMutation({
    mutationFn: ({ id, items }) => updateCart(id, items),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart", user.id],
      });
    },
  })
  if (!user) return null;
  if (isLoading) return <p>Loading Cart...</p>;

  if (isError) return <p>Failed to load Cart.</p>;

  const items = cart?.items || [];

  const handleQ = (id, change) => {
    const updatedItems = items.map((item) =>
      item.productId === id
        ? { ...item, quantity: item.quantity + change }
        : item
    );

    cartMutation.mutate({
      id: cart.id,
      items: updatedItems,
    });
  };
  const handleRemove =(id)=>{

    cartMutation.mutate({
      id:cart.id,
      items:items.filter((item)=>item.productId !== id),
    })
    
  }

  if (items.length === 0) {
   
    return <p className="mt-50 text-center">Your Cart is empty,<Link to="/shop" > Shop More</Link></p>;
  }
  

  return (
    <div className="mt-50" >
      {
        items.map((item) => (
          <div key={item.id}>
            <div>{item.name}</div>
            <div>{item.quantity}</div>
            <div>{item.category}</div>
            <div>{item.price}</div>
            <button onClick={() => handleQ(item.productId, 1)} >+</button>
            <button onClick={() => handleQ(item.productId, -1)} >-</button>
            <button onClick={()=>handleRemove(item.productId)} >Remove Item</button>
          </div>
        ))
      }
    </div>
  )
}

export default Cart