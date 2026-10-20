import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { getCart, updateCart } from '../services/CartService';
import { placeOrder } from '../services/OrderService';
import { useNavigate } from 'react-router-dom';


function Checkout() {

   const navigate =useNavigate();

  const user = useSelector((state) => state.auth.user);
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    paymentMethod: "COD"
  });

  const { data: cart, isLoading, isError } = useQuery({
    queryKey: ["cart", user?.id],
    queryFn: () => getCart(user.id),
    enabled: !!user
  })
  const items = cart?.items || [];

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  function handleChange(e) {

    const { name, value } = e.target;
    setForm({
      ...form, [name]: value
    })

  }
  const orderMutation = useMutation({
    mutationFn: placeOrder,
    onSuccess: async () => {
      alert("Order placed successfully!");

      await updateCart(cart.id, []);
       navigate("/orders")


      queryClient.invalidateQueries({
        queryKey: ["cart", user.id],
      });
    },
    onError: (error) => {
      console.error("Order failed:", error);
      alert("Failed to place order.");
    },
  })
  function handlePlaceOrder(e) {
    e.preventDefault();

    if (items.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const hasEmptyField = [
      form.name,
      form.email,
      form.phone,
      form.address,
      form.city,
      form.pincode,
    ].some((value) => !value.trim());

    if (hasEmptyField) {
      alert("Please fill in all delivery details.");
      return;
    }

    const orderData = {
      userId: user.id,
      customer: form,
      items: items,
      total: total,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };
    orderMutation.mutate(orderData)
    
  
  
  }

  if (!user) {
    return <p>Please log in to continue.</p>;
  }

  if (isLoading) {
    return <p>Loading checkout...</p>;
  }

  if (isError) {
    return <p>Failed to load your cart.</p>;
  }

  if (items.length === 0) {
    return <p>Your cart is empty. Add products before checkout.</p>;
  }


  return (
  <main className="relative min-h-screen overflow-hidden bg-[#f6f1e9] text-[#171614]">

    {/* Decorative Background */}
    <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[33.5%] lg:block">
      <img
        src="/images/login/login-hero.png"
        alt=""
        className="h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-[#e8d9c6]/15" />
    </div>

    <div className="relative z-10 mx-auto max-w-[1600px] px-5 pb-12 pt-6 sm:px-8 md:px-[6%] mt-20">

      {/* Brand */}
     
      {/* Heading */}
      <header className="mb-8">
        <nav className="mb-5 flex flex-wrap items-center gap-3 text-xs text-[#777067]">
          <a href="/" className="hover:text-black">
            Home
          </a>
          <span>/</span>
          <a href="/cart" className="hover:text-black">
            Cart
          </a>
          <span>/</span>
          <span>Checkout</span>
        </nav>

        <h1 className="font-serif text-4xl tracking-[-0.045em] sm:text-5xl">
          Checkout
        </h1>

        <p className="mt-2 font-serif text-base text-[#777067] sm:text-xl">
          Complete your order and enjoy your fragrances.
        </p>
      </header>

      {/* Checkout Form and Order Summary */}
      <form
        onSubmit={handlePlaceOrder}
        className="grid items-start gap-6 lg:grid-cols-[1.55fr_1fr] xl:gap-8"
      >

        {/* Left Column */}
        <div className="space-y-5">

          {/* Shipping Details */}
          <section className="border border-white/50 bg-[#faf7f1]/80 p-5 sm:p-7">

            <div className="mb-6 flex items-center gap-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e5d9ca] font-serif text-xl">
                1
              </span>

              <h2 className="font-serif text-2xl tracking-[-0.03em]">
                Shipping Details
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">

              {/* Name */}
              <div>
                <label htmlFor="checkout-name" className="mb-2 block text-sm">
                  Full Name
                </label>
                <input
                  id="checkout-name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                  className="h-12 w-full border border-[#d7d0c6] bg-transparent px-4 text-sm outline-none transition focus:border-[#716557]"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="checkout-email" className="mb-2 block text-sm">
                  Email Address
                </label>
                <input
                  id="checkout-email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                  className="h-12 w-full border border-[#d7d0c6] bg-transparent px-4 text-sm outline-none transition focus:border-[#716557]"
                />
              </div>

              {/* Phone */}
              <div className="sm:col-span-2">
                <label htmlFor="checkout-phone" className="mb-2 block text-sm">
                  Phone Number
                </label>
                <input
                  id="checkout-phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={form.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                  required
                  className="h-12 w-full border border-[#d7d0c6] bg-transparent px-4 text-sm outline-none transition focus:border-[#716557]"
                />
              </div>

              {/* Address */}
              <div className="sm:col-span-2">
                <label htmlFor="checkout-address" className="mb-2 block text-sm">
                  Address
                </label>
                <textarea
                  id="checkout-address"
                  name="address"
                  placeholder="Enter your address"
                  value={form.address}
                  onChange={handleChange}
                  autoComplete="street-address"
                  required
                  rows={1}
                  className="min-h-12 w-full resize-y border border-[#d7d0c6] bg-transparent px-4 py-3 text-sm outline-none transition focus:border-[#716557]"
                />
              </div>

              {/* City */}
              <div>
                <label htmlFor="checkout-city" className="mb-2 block text-sm">
                  City
                </label>
                <input
                  id="checkout-city"
                  name="city"
                  type="text"
                  placeholder="Enter your city"
                  value={form.city}
                  onChange={handleChange}
                  autoComplete="address-level2"
                  required
                  className="h-12 w-full border border-[#d7d0c6] bg-transparent px-4 text-sm outline-none transition focus:border-[#716557]"
                />
              </div>

              {/* Pincode */}
              <div>
                <label htmlFor="checkout-pincode" className="mb-2 block text-sm">
                  Pincode
                </label>
                <input
                  id="checkout-pincode"
                  name="pincode"
                  type="text"
                  inputMode="numeric"
                  placeholder="Enter pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  autoComplete="postal-code"
                  required
                  className="h-12 w-full border border-[#d7d0c6] bg-transparent px-4 text-sm outline-none transition focus:border-[#716557]"
                />
              </div>

            </div>
          </section>

          {/* Payment Method */}
          <section className="border border-white/50 bg-[#faf7f1]/80 p-5 sm:p-7">

            <div className="mb-6 flex items-center gap-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e5d9ca] font-serif text-xl">
                2
              </span>

              <h2 className="font-serif text-2xl tracking-[-0.03em]">
                Payment Method
              </h2>
            </div>

            <div className="space-y-2.5">

              {/* Cash on Delivery */}
              <label
                className={`flex cursor-pointer items-center gap-4 border p-4 transition ${
                  form.paymentMethod === "COD"
                    ? "border-[#bcb0a0] bg-[#f1ebe2]"
                    : "border-[#d7d0c6] hover:bg-[#f6f0e7]"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  checked={form.paymentMethod === "COD"}
                  onChange={handleChange}
                  className="h-5 w-5 shrink-0 accent-[#171614]"
                />

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0"
                >
                  <path d="m12 3 9 5-9 5-9-5 9-5Z" />
                  <path d="M3 8v9l9 5 9-5V8" />
                  <path d="M12 13v9" />
                  <path d="m7.5 5.5 9 5" />
                </svg>

                <span className="min-w-0">
                  <span className="block text-sm font-medium">
                    Cash on Delivery (COD)
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-[#817a72]">
                    Pay when you receive your order
                  </span>
                </span>
              </label>

              {/* UPI */}
              <label
                className={`flex cursor-pointer items-center gap-4 border p-4 transition ${
                  form.paymentMethod === "UPI"
                    ? "border-[#bcb0a0] bg-[#f1ebe2]"
                    : "border-[#d7d0c6] hover:bg-[#f6f0e7]"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="UPI"
                  checked={form.paymentMethod === "UPI"}
                  onChange={handleChange}
                  className="h-5 w-5 shrink-0 accent-[#171614]"
                />

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0"
                >
                  <path d="M13 2 5 13h6l-1 9 9-13h-6l1-7Z" />
                </svg>

                <span className="min-w-0">
                  <span className="block text-sm font-medium">
                    UPI
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-[#817a72]">
                    Pay securely using UPI apps (GPay, PhonePe, etc.)
                  </span>
                </span>
              </label>

              {/* Card */}
              <label
                className={`flex cursor-pointer items-center gap-4 border p-4 transition ${
                  form.paymentMethod === "Card"
                    ? "border-[#bcb0a0] bg-[#f1ebe2]"
                    : "border-[#d7d0c6] hover:bg-[#f6f0e7]"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Card"
                  checked={form.paymentMethod === "Card"}
                  onChange={handleChange}
                  className="h-5 w-5 shrink-0 accent-[#171614]"
                />

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M2 9h20" />
                  <path d="M6 15h4" />
                </svg>

                <span className="min-w-0">
                  <span className="block text-sm font-medium">
                    Credit / Debit Card
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-[#817a72]">
                    Pay using your credit or debit card
                  </span>
                </span>
              </label>

            </div>
          </section>
        </div>

        {/* Right Column: Order Summary */}
        <aside className="border border-white/60 bg-[#faf7f1]/95 p-5 sm:p-7 lg:sticky lg:top-6 lg:p-8">

          <div className="mb-7 flex items-center justify-between gap-3">
            <h2 className="font-serif text-2xl tracking-[-0.035em] sm:text-3xl">
              Order Summary
            </h2>

            <span className="whitespace-nowrap text-xs text-[#777067]">
              {items.reduce((sum, item) => sum + item.quantity, 0)} items
            </span>
          </div>

          {/* Product List */}
          <div className="divide-y divide-[#e5ded4]">

            {items.map((item) => (
              <article
                key={item.productId}
                className="flex items-center gap-3 py-4 first:pt-0 sm:gap-5"
              >

                <div className="flex h-20 w-20 shrink-0 items-center justify-center sm:h-24 sm:w-24">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-contain"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-serif text-lg leading-tight sm:text-xl">
                    {item.name}
                  </h3>

                  <p className="mt-2 text-xs text-[#817a72]">
                    {item.category}
                  </p>

                  <p className="mt-2 text-xs text-[#817a72]">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p className="shrink-0 whitespace-nowrap font-serif text-lg sm:text-xl">
                  ₹{(Number(item.price) * item.quantity).toLocaleString("en-IN")}
                </p>

              </article>
            ))}

          </div>

          {/* Price Breakdown */}
          <div className="mt-2 space-y-3 border-t border-[#e5ded4] pt-5">

            <div className="flex items-center justify-between gap-3">
              <span className="font-serif text-base text-[#777067]">
                Subtotal
              </span>
              <span className="font-serif text-lg">
                ₹{total.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="font-serif text-base text-[#777067]">
                Shipping
              </span>
              <span className="font-serif text-lg">
                ₹0
              </span>
            </div>

            

          </div>

          {/* Total */}
          <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#e5ded4] pt-5">
            <span className="font-serif text-2xl">
              Total
            </span>

            <span className="whitespace-nowrap font-serif text-2xl sm:text-3xl">
              ₹{(total).toLocaleString("en-IN")}
            </span>
          </div>

          {/* Place Order */}
          <button
            type="submit"
            disabled={orderMutation.isPending}
            className="group mt-6 flex min-h-[60px] w-full items-center justify-center gap-4 bg-[#171614] px-5 py-4 text-sm text-white transition-colors hover:bg-[#39342e] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {orderMutation.isPending ? "Placing Order..." : "Place Order"}

            {!orderMutation.isPending && (
              <span className="text-xl transition-transform group-hover:translate-x-1">
                →
              </span>
            )}
          </button>

          {/* Security Note */}
          <div className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-[#625c54]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="4" y="10" width="16" height="11" rx="1" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            </svg>

            <span>Your information is secure and encrypted</span>
          </div>

        </aside>

      </form>
    </div>
  </main>
);
}

export default Checkout