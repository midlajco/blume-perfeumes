import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getOrdersById } from '../../services/OrderService'
import { useParams } from 'react-router-dom'

function AdminOrderDetails() {
    const {id} =useParams();
    const {data:order,isLoading} =useQuery({
        queryFn:()=>getOrdersById(id),
        queryKey:["orders",id]
    })
    if(isLoading){
        return <p>laoidng</p>
    }
    return(
        <div>
            <h1>hhi</h1>
           
          
            <p>{order?.customer?.name}</p>
            <p>{order.customer.email}</p>
            <p>{order.customer.address}</p>
            <p>{order.customer.city}</p>
            <p>{order.customer.paymentMethod}</p>
            <p>{order.customer.pincode}</p>

            <div>
                <h1>items</h1>
                {order.items.map((item)=>(
                   <div>
                     <p>{item.name}</p>
                    <p>{item.quantity}*{item.price}</p>
                    <p>{order.total}</p>
                   </div>
                ))}
            </div>
            <p></p>
        </div>
    )
}

export default AdminOrderDetails