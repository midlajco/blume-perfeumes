import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useSelector } from "react-redux"
import { getCart } from "../services/CartService"
import { Link, useNavigate } from "react-router-dom"
import { updateCart } from "../services/CartService"

function Cart() {
  const navigate = useNavigate()

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
  const handleRemove = (id) => {

    cartMutation.mutate({
      id: cart.id,
      items: items.filter((item) => item.productId !== id),
    })

  }

  if (items.length === 0) {

    return <p className="mt-50 text-center">Your Cart is empty,<Link to="/shop" > Shop More</Link></p>;
  }

return (
  <main className="relative min-h-screen overflow-hidden bg-[#f6f1e9] text-[#171614]">

    {/* Decorative background */}
    <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[19%] lg:block">
      <img
        src="/images/login/login-hero.png"
        alt=""
        className="h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-[#e8d9c6]/20" />
    </div>

    <div className="relative z-10 mx-auto max-w-[1600px] px-5 pb-10 pt-6 sm:px-8 md:px-[5.5%] md:pt-8 mt-10">

      {/* Brand */}
      {/* <Link
        to="/"
        className="inline-block font-serif text-3xl tracking-[0.02em] sm:text-4xl"
      >
        BLUME
      </Link> */}

      {/* Page heading */}
      <header className="mb-6 mt-8 sm:mb-7 sm:mt-9">
        <nav className="mb-5 flex items-center gap-3 text-xs text-[#756e66]">
          <Link to="/" className="transition-colors hover:text-black">
            Home
          </Link>
          <span>/</span>
          <span>Cart</span>
        </nav>

        <h1 className="font-serif text-4xl tracking-[-0.045em] sm:text-5xl">
          Your Cart
        </h1>

        <p className="mt-2 font-serif text-base text-[#777067] sm:text-lg">
          A few beautiful scents, closer to you.
        </p>
      </header>

      {/* Cart and summary */}
      <div className="grid items-start gap-5 lg:grid-cols-[1.55fr_1fr] xl:gap-6">

        {/* Cart items */}
        <section className="border border-[#e1dacf] bg-[#f8f4ed]/90 px-4 sm:px-5">

          <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-3 border-b border-[#ded7cd] py-4 sm:grid-cols-[minmax(0,1fr)_132px_100px]">
            <span className="text-[9px] uppercase tracking-[0.2em]">
              Product
            </span>
            <span className="text-center text-[9px] uppercase tracking-[0.2em]">
              Quantity
            </span>
            <span className="text-right text-[9px] uppercase tracking-[0.2em]">
              Price
            </span>
          </div>

          {items.map((item) => (
            <article
              key={item.productId}
              className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-3 border-b border-[#e5ded4] py-4 last:border-b-0 sm:grid-cols-[minmax(0,1fr)_132px_100px] sm:gap-4 sm:py-5"
            >

              {/* Product */}
              <div className="flex min-w-0 items-center gap-3 sm:gap-5">
                <Link
                  to={`/products/${item.productId}`}
                  className="flex h-24 w-[68px] shrink-0 items-center justify-center sm:h-32 sm:w-[105px]"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-contain transition-transform duration-300 hover:scale-105"
                  />
                </Link>

                <div className="min-w-0">
                  <Link
                    to={`/products/${item.productId}`}
                    className="font-serif text-base leading-tight transition-colors hover:text-[#8a7966] sm:text-2xl"
                  >
                    {item.name}
                  </Link>

                  <p className="mt-2 text-xs text-[#888078] sm:text-sm">
                    {item.category}
                  </p>

                  <button
                    onClick={() => handleRemove(item.productId)}
                    className="mt-3 text-xs text-[#393631] underline underline-offset-4 hover:text-[#8a7966]"
                  >
                    Remove
                  </button>
                </div>
              </div>

              {/* Quantity */}
              <div className="flex h-10 items-center justify-center border border-[#d8d0c5] sm:h-12">
            {
              item.quantity>1 && 
                  <button
                  type="button"
                  disabled={item.quantity<2}
                  onClick={() =>
                     handleQ(item.productId, -1)
                     
                  }
                  aria-label={`Decrease ${item.name} quantity`}
                  className="h-full px-2 text-sm transition-colors hover:bg-[#ece5db] sm:px-3"
                >
                  −
                </button>
            }

                <span className="min-w-5 text-center font-serif text-sm">
                  {item.quantity}
                </span>

                <button
                  type="button"
                  onClick={() => handleQ(item.productId, 1)}
                  aria-label={`Increase ${item.name} quantity`}
                  className="h-full px-2 text-sm transition-colors hover:bg-[#ece5db] sm:px-3"
                >
                  +
                </button>
              </div>

              {/* Item total */}
              <p className="whitespace-nowrap text-right font-serif text-sm sm:text-xl">
                ₹{(Number(item.price) * item.quantity).toLocaleString("en-IN")}
              </p>

            </article>
          ))}
        </section>

        {/* Order summary */}
        <aside className="border border-[#e1dacf] bg-[#f8f4ed]/95 p-5 sm:p-7 lg:sticky lg:top-8 lg:p-7">

          <h2 className="font-serif text-2xl tracking-[-0.035em] sm:text-3xl">
            Order Summary
          </h2>

          <div className="mt-7 space-y-4">

            <div className="flex items-center justify-between gap-3">
              <span className="font-serif text-base text-[#777067] sm:text-lg">
                Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)
              </span>

              <span className="whitespace-nowrap font-serif text-base sm:text-lg">
                ₹{items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0).toLocaleString("en-IN")}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-serif text-base text-[#777067] sm:text-lg">
                Shipping
              </span>
              <span className="font-serif text-base sm:text-lg">₹0</span>
            </div>

            {/* <div className="flex items-center justify-between border-b border-[#ded7cd] pb-5">
              <span className="font-serif text-base text-[#777067] sm:text-lg">
                Tax
              </span>
              <span className="font-serif text-base sm:text-lg">₹0</span>
            </div> */}

            <div className="flex items-center justify-between gap-3 pt-1">
              <span className="font-serif text-2xl">Total</span>
              <span className="whitespace-nowrap font-serif text-2xl sm:text-3xl">
                ₹{items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0).toLocaleString("en-IN")}
              </span>
            </div>

          </div>

          <button
            type="button"
            onClick={() => navigate("/checkout")}
            className="group mt-6 flex min-h-[58px] w-full items-center justify-center gap-4 bg-[#171614] px-4 py-4 text-sm text-white transition-colors duration-300 hover:bg-[#39342e]"
          >
            Proceed to Checkout
            <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>

          {/* Shopping benefits */}
          <div className="mt-7 grid grid-cols-3 gap-2 text-center">

            <div className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 4c-8 0-14 4-14 11 0 2 1 4 3 5 7-2 11-8 11-16Z" />
                <path d="M4 22c3-6 7-10 12-13" />
              </svg>
              <p className="mt-2 text-xs leading-5 text-[#655e55]">
                Secure
                <br />
                Checkout
              </p>
            </div>

            <div className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="27"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 6h12v12H3z" />
                <path d="M15 10h4l3 4v4h-7z" />
                <circle cx="7.5" cy="19" r="2" />
                <circle cx="18.5" cy="19" r="2" />
              </svg>
              <p className="mt-2 text-xs leading-5 text-[#655e55]">
                Free
                <br />
                Shipping
              </p>
            </div>

            <div className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 8h16v13H4z" />
                <path d="M2 8l4-5h12l4 5" />
                <path d="M2 8h20" />
                <path d="M9 12a3 3 0 0 0 6 0" />
              </svg>
              <p className="mt-2 text-xs leading-5 text-[#655e55]">
                Easy
                <br />
                Returns
              </p>
            </div>

          </div>
        </aside>
      </div>

      {/* Continue shopping */}
      <Link
        to="/shop"
        className="group mt-8 inline-flex items-center gap-3 font-serif text-base transition-colors hover:text-[#8a7966]"
      >
        <span className="text-xl transition-transform group-hover:-translate-x-1">
          ←
        </span>
        Continue Shopping
      </Link>

    </div>
  </main>
)
}

export default Cart