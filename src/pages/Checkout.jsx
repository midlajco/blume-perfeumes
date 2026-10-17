import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { getCart } from '../services/CartService';
import { placeOrder } from '../services/OrderService';


function Checkout() {

   
  const user =useSelector((state)=>state.auth.user);
 const queryClient =useQueryClient();

   const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const {data:cart,isLoading,isError}=useQuery({
    queryKey:["cart",user?.id],
    queryFn:() => getCart(user.id),
    enabled:!!user
  })
  const items =cart?.items || [];
  
  const total =items.reduce ((sum,item)=> sum + item.price * item.quantity,0) 

  function handleChange (e){

     const {name,value} =e.target;
      setForm({
        ...form,[name]:value
      })

  }
  const orderMutation =useMutation({
    mutationFn:placeOrder,
    onSuccess:()=>{
 alert("Order placed successfully!");

      queryClient.invalidateQueries({
        queryKey: ["cart", user.id],
      });
    }
  })
  function handlePlaceOrder (e){
    e.preventDefault();
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

      <h2>OrderSummary</h2>
      {
        items.map ((item)=>(
          <div key={item.productId} >
           <p>{item.name}</p>
           <p>{item.price}</p>
           

          </div>
         
        ))
      } 
       <p>total : {total}</p>  
       <button type='submit' >place</button>   
          
    </form>
    </div>
  )
}

export default Checkout