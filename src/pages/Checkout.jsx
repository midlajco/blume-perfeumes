import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { getCart, updateCart } from '../services/CartService';
import { placeOrder } from '../services/OrderService';


function Checkout() {


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
      
        await updateCart (cart.id,[])
      

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
    <div>
      <form onSubmit={handlePlaceOrder}
        className='mt-50' >
        <h1>Delivery Details</h1>
        <input name="name"
          placeholder='Name'
          value={form.name}
          onChange={handleChange} />
        <input name="phone"
          placeholder='phone'
          value={form.phone}
          onChange={handleChange} />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <textarea name="address"
          placeholder='address'
          value={form.address}
          onChange={handleChange} />
        <input name="city"
          placeholder='city'
          value={form.city}
          onChange={handleChange} />
        <input name="pincode"
          placeholder='pincode'
          value={form.pincode}
          onChange={handleChange} />
        <h2>Payment Method</h2>

        <select
          name="paymentMethod"
          value={form.paymentMethod}
          onChange={handleChange}
        >
          <option value="COD">Cash on Delivery</option>
          <option value="UPI">UPI</option>
          <option value="Card">Credit/Debit Card</option>
        </select>


        <h2>OrderSummary</h2>
        {
          items.map((item) => (
            <div key={item.productId} >
              <p>{item.name}</p>
              <p>{item.price}</p>


            </div>

          ))
        }
        <p>total : {total}</p>
        <button type='submit'  disabled={orderMutation.isPending} >place</button>

      </form>
    </div>
  )
}

export default Checkout