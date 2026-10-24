import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getUsers } from '../../services/UserService'
import { getProducts } from '../../services/ProductService';
import { getorders } from '../../services/OrderService';

function Dashboard() {
  const { data: users } = useQuery({
    queryFn: getUsers,
    queryKey: ["users"]

  });

  const { data: products } = useQuery({
    queryFn: getProducts,
    queryKey: ["products"]

  })

  const { data: orders } = useQuery({
    queryFn: getorders,
    queryKey: ["orders"]

  })
  const recentOrders = orders?.slice(0, 5)
  const totalRevenue = orders?.reduce((total, order) => {
    if (order.status !== "delivered") {
      return total
    }
    return (
      total + Number(order.total)
    )


  }, 0)
  const deliveredOrders=orders?.filter((order)=>(
    order.status === "delivered"
  ))
  const pendingOrders=orders?.filter((order)=>(
    order.status === "pending"
  ))
  const shippedOrders=orders?.filter((order)=>(
    order.status === "shipped"
  ))
  const cancelledOrders=orders?.filter((order)=>(
    order.status === "cancelled"
  ))


  return (
    <div>
      <p>total users :{users?.length}</p>
      <p>total products :{products?.length}</p>
      <p>total orders :{orders?.length}</p>
      <p>total revenue:{totalRevenue}</p>

      <p>deliveredOrders :{deliveredOrders.length}</p>
      <p>pendingOrders :{pendingOrders.length}</p>
      <p>shippedOrders :{shippedOrders.length}</p>
      <p>cancelledOrders :{cancelledOrders.length}</p>
      <div>
        {
          recentOrders?.map((order) => (
            <div>
              <p>{order.customer.name}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Dashboard