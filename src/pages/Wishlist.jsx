import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { Link } from 'react-router-dom'
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
    <main className="min-h-screen bg-[#f6f1e9] text-[#171614]">

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-black/10">
        <img
          src="/images/shop/shop-hero.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f5f0e8]/95 via-[#f5f0e8]/80 to-[#f5f0e8]/25" />

        <div className="relative mx-auto max-w-[1600px] px-5 pb-8 pt-32 sm:px-8 md:px-[4.5%] md:pt-36">
          <nav className="mb-5 flex items-center gap-3 text-xs text-[#777067]">
            <Link to="/" className="transition-colors hover:text-black">Home</Link>
            <span>/</span>
            <span>Wishlist</span>
          </nav>

          <h1 className="font-serif text-4xl tracking-[-0.045em] sm:text-5xl">
            Your Wishlist
          </h1>

          <p className="mt-2 font-serif text-base text-[#777067] sm:text-xl">
            Scents you love, saved for later.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-[1600px] px-5 pb-16 pt-8 sm:px-8 md:px-[4.5%]">

        {isLoading && <p className="text-sm text-[#777067]">Loading wishlist...</p>}

        {isError && <p className="text-sm text-red-600">Failed to load wishlist.</p>}

        {!isLoading && !isError && items.length === 0 && (
          <div className="flex min-h-[350px] flex-col items-center justify-center text-center">
            <h2 className="font-serif text-3xl">Your Wishlist is Empty</h2>
            <p className="mt-3 text-sm text-[#777067]">
              Discover your next signature scent.
            </p>
            <Link
              to="/shop"
              className="mt-6 bg-[#171614] px-8 py-4 text-xs text-white transition hover:bg-[#39342e]"
            >
              Explore Fragrances
            </Link>
          </div>
        )}

        {items.length > 0 && (
          <>
            <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((item) => (
                <article key={item.productId} className="flex min-w-0 flex-col">

                  <Link
                    to={`/products/${item.productId}`}
                    className="group relative block aspect-[4/5] overflow-hidden bg-[#e9dfd2]"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>

                  <div className="flex flex-1 flex-col pt-4">
                    <Link
                      to={`/products/${item.productId}`}
                      className="w-fit font-serif text-xl tracking-[-0.025em] transition-colors hover:text-[#8a7966] sm:text-2xl"
                    >
                      {item.name}
                    </Link>

                    <p className="mt-2 text-sm text-[#817a72]">{item.category}</p>

                    <p className="mt-2 font-serif text-xl">
                      ₹{Number(item.price).toLocaleString('en-IN')}
                    </p>

                    <button
                      type="button"
                      onClick={() => handleAddToCart(item)}
                      className="mt-4 min-h-[52px] w-full bg-[#171614] px-4 py-3 text-sm text-white transition-colors hover:bg-[#39342e]"
                    >
                      Move to Bag
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRemove(item.productId)}
                      disabled={removeMutation.isPending}
                      className="mt-3 flex min-h-[52px] w-full items-center justify-center gap-3 border border-[#d4ccc1] px-4 py-3 text-sm transition-colors hover:border-black hover:bg-[#eee7dd] disabled:opacity-50"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 6h18" />
                        <path d="M8 6V4h8v2" />
                        <path d="m19 6-1 14H6L5 6" />
                        <path d="M10 10v6M14 10v6" />
                      </svg>
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-12 border-t border-[#e2d9ce] pt-6">
              <Link
                to="/shop"
                className="inline-flex items-center gap-3 font-serif text-base transition-colors hover:text-[#8a7966]"
              >
                <span className="text-xl">←</span>
                Continue Shopping
              </Link>
            </div>
          </>
        )}
      </section>
    </main>
  )
 
 
 
 
}
export default Wishlist