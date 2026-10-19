import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { useSelector } from 'react-redux'
import { getWishList, updateWishlist } from '../services/WishlistService'
import { addProductToCart, createCart, getCart, updateCart } from '../services/CartService'

function Wishlist() {
  const user = useSelector((state) => state.auth.user)
  const queryClient = useQueryClient()



  const { data: wishlist, isLoading, isError } = useQuery({
    queryKey: ["wishlist", user?.id],
    queryFn: () => getWishList(user.id),
    enabled: !!user


  })
  const removeMutation = useMutation({
    mutationFn: ({ wishlistId, items }) => updateWishlist(wishlistId, items),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['wishlist', user?.id],
      });
    },
  });
  if (isLoading) return <p>Loading wishlist...</p>;

  if (isError) return <p>Failed to load wishlist.</p>;

  const items = wishlist?.items || [];



  if (items.length === 0) {
    return <p className="mt-50 text-center">Your wishlist is empty.</p>;
  }
  console.log(items)


  const handleRemove = (productId) => {
    removeMutation.mutate({
      wishlistId: wishlist.id,
      items: items.filter(
        (item) => (item.productId) !== (productId)
      ),
    });
  };
  const handleAddToCart = async (product) => {
    const newItem = {
      id: product.productId,
      name: product.name,
      description: product.description,
      category: product.category,
      image: product.image,
      price: product.price,
      quantity: 1
    }
    await addProductToCart(user.id, newItem)
    await queryClient.invalidateQueries({
      queryKey: ["cart", user.id],
    });

  }



  return (
    <div className='mt-50' >
      {
        items.map((item) => (
          <div key={item.productId}>
            <p>{item.productId}</p>
            <button onClick={() => handleAddToCart(item)} >addtocart</button>

            <button onClick={() => {
              handleRemove(item.productId); console.log("ok");
            }} >remove</button>
          </div>
        ))
      }
    </div>
  )
}
export default Wishlist