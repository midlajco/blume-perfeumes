import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { changeOrderStatus, getorders } from '../../services/OrderService'
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronDown, Filter, Package, Search } from 'lucide-react';

function AdminOrders() {

  const queryClient = useQueryClient();

  const [searchterm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");




  const { data: orders, isLoading, isError } = useQuery({
    queryFn: getorders,
    queryKey: ["orders"]
  })

  const statusMutation = useMutation({
    mutationFn: ({ orderId, status }) => changeOrderStatus({ orderId, status }),
    onSuccess: () => queryClient.invalidateQueries({
      queryKey: ["orders"]
    })
  })

  const handleStatusChange = (orderId, newStatus) => {
    statusMutation.mutate({
      orderId: orderId,
      status: newStatus,
    })
  }
  const filteredOrders = orders?.filter((order) => order.customer.name.toLowerCase().includes(searchterm) || order.id.toLowerCase().includes(searchterm))
    .filter((order) => statusFilter === "all" || order.status === statusFilter)


  if (isLoading) {
    return <p>loading</p>
  }
  if (isError) {
    return <p>failed to laod</p>
  }



  return (
    <div className="min-h-screen bg-[#f8f5ef] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Header */}
        <div>
          <h1 className="font-serif text-3xl text-[#29251f] sm:text-4xl">
            Orders
          </h1>
          <p className="mt-2 text-sm text-[#82796e]">
            Manage customer orders
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8d8479]"
            />
            <input
              className="w-full rounded-lg border border-[#e2dacf] bg-[#fbf9f5] py-3 pl-11 pr-4 text-sm text-[#302b25] outline-none transition focus:border-[#a79782]"
              placeholder="Search orders..."
              value={searchterm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative sm:w-56">
            <Filter
              size={17}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#82796e]"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full cursor-pointer appearance-none rounded-lg border border-[#e2dacf] bg-[#fbf9f5] py-3 pl-10 pr-10 text-sm text-[#403930] outline-none focus:border-[#a79782]"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#82796e]"
            />
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-hidden rounded-lg border border-[#e5ddd2] bg-[#fbf9f5]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px] border-collapse text-left">
              <thead className="bg-[#f0e9df]">
                <tr className="text-xs font-medium uppercase tracking-wide text-[#71675b]">
                  <th className="px-6 py-4">#</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Change Status</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#e9e1d7]">
                {filteredOrders?.map((order) => (
                  <tr
                    key={order.id}
                    className="transition-colors hover:bg-[#f6f1e9]"
                  >
                    {/* Order ID */}
                    <td className="whitespace-nowrap px-6 py-5 text-sm font-medium text-[#302b25]">
                      #{order.id}
                    </td>

                    {/* Customer */}
                    <td className="whitespace-nowrap px-6 py-5 text-sm text-[#302b25]">
                      {order.customer.name}
                    </td>

                    {/* Total */}
                    <td className="whitespace-nowrap px-6 py-5 text-sm font-medium text-[#302b25]">
                      ₹{Number(order.total).toLocaleString("en-IN")}
                    </td>

                    {/* Current Status */}
                    <td className="px-6 py-5">
                      <span
                        // className={`inline-flex min-w-20 justify-center rounded-md px-3 py-2 text-xs font-medium capitalize ${
                        //   order.status === "shipped"
                        //     ? "bg-[#e7e0d5] text-[#655846]"
                        //     : order.status === "delivered"
                        //     ? "bg-[#e3e7dc] text-[#48533e]"
                        //     : order.status === "cancelled"
                        //     ? "bg-[#f0d9d3] text-[#8b4b40]"
                        //     : order.status === "pending"
                        //     ? "bg-[#eee8df] text-[#776b5b]"
                        //     : "bg-[#e9e2d8] text-[#655846]"
                        // }`}
                        className={`inline-flex min-w-20 justify-center rounded-md px-3 py-2 text-xs font-medium capitalize ${order.status === "pending"
                            ? "bg-amber-100 text-amber-800"
                            : order.status === "shipped"
                              ? "bg-sky-100 text-sky-800"
                              : order.status === "delivered"
                                ? "bg-emerald-100 text-emerald-800"
                                : order.status === "cancelled"
                                  ? "bg-rose-100 text-rose-800"
                                  : "bg-stone-100 text-stone-700"
                          }`}
                      >
                        {order.status}
                      </span>
                    </td>

                    {/* Change Status */}
                    <td className="px-6 py-4">
                      <div className="relative w-40">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(order.id, e.target.value)
                          }
                          disabled={statusMutation.isPending}
                          className="w-full cursor-pointer appearance-none rounded-lg border border-[#dfd6ca] bg-[#fbf9f5] px-4 py-3 pr-9 text-sm capitalize text-[#403930] outline-none transition hover:border-[#b9a994] focus:border-[#a79782] disabled:cursor-wait disabled:opacity-60"
                        >
                          <option value="pending">Pending</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                        <ChevronDown
                          size={16}
                          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#655b50]"
                        />
                      </div>
                    </td>

                    {/* Date */}
                    <td className="whitespace-nowrap px-6 py-5 text-sm text-[#82796e]">
                      {new Date(order.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    {/* Action */}
                    <td className="px-6 py-5 text-center">
                      <Link
                        to={`/admin/orders/${order.id}`}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-[#55483a] underline decoration-[#b8aa98] underline-offset-4 transition hover:text-black"
                      >
                        View
                        <ArrowUpRight size={14} />
                      </Link>
                    </td>
                  </tr>
                ))}

                {/* Empty State */}
                {filteredOrders?.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center gap-3 text-[#8b8175]">
                        <PackageSearch size={32} strokeWidth={1.4} />
                        <p className="text-sm">
                          No orders found
                        </p>
                        <p className="text-xs">
                          Try changing your search or status filter.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-sm text-[#82796e]">
          <p>
            Showing{" "}
            <span className="font-medium text-[#403930]">
              {filteredOrders?.length ?? 0}
            </span>{" "}
            of{" "}
            <span className="font-medium text-[#403930]">
              {orders?.length ?? 0}
            </span>{" "}
            orders
          </p>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline">
              <Package size={16} className="inline-block mr-2" />
              Order management
            </span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AdminOrders