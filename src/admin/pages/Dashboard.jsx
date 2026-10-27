import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getUsers } from '../../services/UserService'
import { getProducts } from '../../services/ProductService';
import { getorders } from '../../services/OrderService';

import {
  Users,
  Package,
  ShoppingCart,
  IndianRupee,
  CheckCircle,
  Clock,
  Truck,
  XCircle,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import {
  PieChart,
  Pie,
  Cell,
  
} from "recharts";
import { error } from 'server/router';



function Dashboard() {
  const { data: users,isLoading,isError } = useQuery({
    queryFn: getUsers,
    queryKey: ["users"]

  });

  const { data: products,} = useQuery({
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

const statusData = ["Pending", "Shipped", "Delivered", "Cancelled"].map(
  (status) => ({
    name: status,
    value: (orders ?? []).filter(
      (order) => order.status?.toLowerCase() === status.toLowerCase()
    ).length,
  })
);

const statusColors = ["#d8c8a8", "#b6a18a", "#a9bc86", "#d49a94"];
if(isLoading){
  return <p>Loading</p>
}
if(isError){
  return <p>somethng went wrong</p>
  
}
return (
  <div className="min-h-screen bg-[#f7f3ed] p-4 text-[#292724] sm:p-6">
    {/* Dashboard Header */}
    <div className="mb-6">
      <h1 className="font-serif text-3xl">Dashboard</h1>
      <p className="mt-1 text-sm text-gray-500">
        Welcome back, Admin
      </p>
    </div>

    {/* Summary Cards */}
    <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {[
        {
          title: "Total Users",
          value: users?.length ?? 0,
          icon: Users,
        },
        {
          title: "Total Products",
          value: products?.length ?? 0,
          icon: Package,
        },
        {
          title: "Total Orders",
          value: orders?.length ?? 0,
          icon: ShoppingCart,
        },
        {
          title: "Total Revenue",
          value: `₹${(totalRevenue ?? 0).toLocaleString("en-IN")}`,
          icon: IndianRupee,
        },
      ].map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="flex items-center gap-4 rounded-lg border border-[#ebe3d9] bg-[#fcfaf7] p-5"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#eee6db]">
              <Icon
                size={22}
                strokeWidth={1.7}
                className="text-[#8b6b45]"
              />
            </div>

            <div>
              <p className="text-xs text-gray-500">{card.title}</p>
              <h2 className="mt-1 text-2xl font-semibold">
                {card.value}
              </h2>
            </div>
          </div>
        );
      })}
    </div>

    {/* Order Statistics */}
    <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {[
        {
          title: "Delivered Orders",
          value: deliveredOrders?.length ?? 0,
          icon: CheckCircle,
          color: "bg-green-100 text-green-700",
        },
        {
          title: "Pending Orders",
          value: pendingOrders?.length ?? 0,
          icon: Clock,
          color: "bg-orange-100 text-orange-700",
        },
        {
          title: "Shipped Orders",
          value: shippedOrders?.length ?? 0,
          icon: Truck,
          color: "bg-blue-100 text-blue-700",
        },
        {
          title: "Cancelled Orders",
          value: cancelledOrders?.length ?? 0,
          icon: XCircle,
          color: "bg-red-100 text-red-700",
        },
      ].map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="flex items-center justify-between rounded-lg border border-[#ebe3d9] bg-[#fcfaf7] p-4"
          >
            <div>
              <p className="text-xs text-gray-500">{item.title}</p>
              <p className="mt-2 text-2xl font-semibold">
                {item.value}
              </p>
            </div>

            <div
              className={`flex h-11 w-11 items-center justify-center rounded-full ${item.color}`}
            >
              <Icon size={21} strokeWidth={1.7} />
            </div>
          </div>
        );
      })}
    </div>

    {/* Orders Graph and Status Chart */}
    <div className="mb-5 grid grid-cols-1 gap-4 xl:grid-cols-3">
      {/* Monthly Orders Graph */}
      <div className="rounded-lg border border-[#ebe3d9] bg-[#fcfaf7] p-5 xl:col-span-2">
        <div className="mb-5">
          <h2 className="font-serif text-xl">Orders Overview</h2>
          <p className="mt-1 text-xs text-gray-500">
            Monthly order count for {new Date().getFullYear()}
          </p>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={monthlyOrders}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="ordersFill"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#ad9475"
                    stopOpacity={0.4}
                  />
                  <stop
                    offset="100%"
                    stopColor="#ad9475"
                    stopOpacity={0.03}
                  />
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

      {/* Order Status Doughnut Chart */}
      <div className="rounded-lg border border-[#ebe3d9] bg-[#fcfaf7] p-5">
        <h2 className="font-serif text-xl">Order Status</h2>
        <p className="mt-1 text-xs text-gray-500">
          Order distribution
        </p>

        <div className="relative mx-auto mt-3 h-52 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
              >
                {statusData.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={statusColors[index]}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-semibold">
              {orders?.length ?? 0}
            </span>
            <span className="text-xs text-gray-500">Orders</span>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {statusData.map((item, index) => (
            <div
              key={item.name}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: statusColors[index] }}
                />
                <span className="text-gray-600">{item.name}</span>
              </div>

              <span className="font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Recent Orders Table */}
    <div className="overflow-hidden rounded-lg border border-[#ebe3d9] bg-[#fcfaf7]">
      <div className="flex items-center justify-between border-b border-[#ebe3d9] px-5 py-4">
        <div>
          <h2 className="font-serif text-xl">Recent Orders</h2>
          <p className="mt-1 text-xs text-gray-500">
            Latest customer orders
          </p>
        </div>

        <a
          href="/admin/orders"
          className="text-xs text-gray-600 underline underline-offset-4 hover:text-black"
        >
          View All
        </a>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#f3eee7] text-xs text-gray-600">
            <tr>
              <th className="px-5 py-4 font-medium">Order ID</th>
              <th className="px-5 py-4 font-medium">Customer</th>
              <th className="px-5 py-4 font-medium">Total</th>
              <th className="px-5 py-4 font-medium">Status</th>
              <th className="px-5 py-4 font-medium">Date</th>
            </tr>
          </thead>

          <tbody>
            {recentOrders?.map((order, index) => (
              <tr
                key={order.id ?? index}
                className="border-b border-[#eee8e0] last:border-0 hover:bg-[#f8f4ee]"
              >
                <td className="whitespace-nowrap px-5 py-4 font-medium">
                  #{order.id ?? index + 1}
                </td>

                <td className="whitespace-nowrap px-5 py-4">
                  {order.customer?.name ?? "Customer"}
                </td>

                <td className="whitespace-nowrap px-5 py-4">
                  ₹{Number(order.total ?? 0).toLocaleString("en-IN")}
                </td>

                <td className="whitespace-nowrap px-5 py-4">
                  <span
                    className={`rounded-md px-2.5 py-1 text-xs ${
                      order.status === "delivered"
                        ? "bg-green-100 text-green-800"
                        : order.status === "shipped"
                        ? "bg-blue-100 text-blue-800"
                        : order.status === "cancelled"
                        ? "bg-red-100 text-red-800"
                        : "bg-orange-100 text-orange-800"
                    }`}
                  >
                    {order.status ?? "pending"}
                  </span>
                </td>

                <td className="whitespace-nowrap px-5 py-4 text-gray-500">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "-"}
                </td>
              </tr>
            ))}

            {(!recentOrders || recentOrders.length === 0) && (
              <tr>
                <td
                  colSpan="5"
                  className="px-5 py-10 text-center text-gray-500"
                >
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
}

export default Dashboard