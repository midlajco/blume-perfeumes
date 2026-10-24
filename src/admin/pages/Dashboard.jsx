import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getUsers } from '../../services/UserService'
import { getProducts } from '../../services/ProductService';
import { getorders } from '../../services/OrderService';

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

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

const monthlyOrders = Array.from({ length: 12 }, (_, monthIndex) => {
  const year = new Date().getFullYear();

  const total = (orders ?? []).filter((order) => {
    const date = new Date(
      order.createdAt 
    );

    return (
      !Number.isNaN(date.getTime()) &&
      date.getFullYear() === year &&
      date.getMonth() === monthIndex
    );
  }).length;

  return {
    month: new Date(year, monthIndex, 1).toLocaleString("en-US", {
      month: "short",
    }),
    total,
  };
});
  return (
    <div>
      <p>total users :{users?.length}</p>
      <p>total products :{products?.length}</p>
      <p>total orders :{orders?.length}</p>
      <p>total revenue:{totalRevenue}</p>

      <p>deliveredOrders :{deliveredOrders?.length}</p>
      <p>pendingOrders :{pendingOrders?.length}</p>
      <p>shippedOrders :{shippedOrders?.length}</p>
      <p>cancelledOrders :{cancelledOrders?.length}</p>

      
{/* Monthly Orders Graph */}
<div className="mt-5 rounded-lg border border-[#ebe3d9] bg-[#fcfaf7] p-5">
  <div className="mb-4">
    <h2 className="font-serif text-xl">Orders</h2>
    <p className="text-xs text-gray-500">Monthly order count</p>
  </div>

  <div className="h-72 w-full">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={monthlyOrders}
        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
      >
        <defs>
          <linearGradient id="ordersFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ad9475" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#ad9475" stopOpacity={0.03} />
          </linearGradient>
        </defs>

        <CartesianGrid
          stroke="#eae3da"
          strokeDasharray="3 3"
          vertical={false}
        />

        <XAxis
          dataKey="month"
          tick={{ fontSize: 11, fill: "#81786d" }}
          axisLine={false}
          tickLine={false}
        />

        <YAxis
          allowDecimals={false}
          tick={{ fontSize: 11, fill: "#81786d" }}
          axisLine={false}
          tickLine={false}
        />

        <Tooltip
          contentStyle={{
            backgroundColor: "#fcfaf7",
            border: "1px solid #e8e1d8",
            borderRadius: "8px",
            fontSize: "12px",
          }}
        />

        <Area
          type="monotone"
          dataKey="total"
          name="Orders"
          stroke="#a58a69"
          strokeWidth={2}
          fill="url(#ordersFill)"
          activeDot={{ r: 5 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
</div>

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