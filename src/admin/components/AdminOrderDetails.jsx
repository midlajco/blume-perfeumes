import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getOrdersById } from '../../services/OrderService'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Mail,
  Phone,
  CreditCard,
  Package,
} from "lucide-react";

function AdminOrderDetails() {
    const {id} =useParams();
    const {data:order,isLoading} =useQuery({
        queryFn:()=>getOrdersById(id),
        queryKey:["orders",id]
    })
    if(isLoading){
        return <p>laoidng</p>
    }
    return (
  <div className="min-h-screen bg-[#f7f3ec] p-5 sm:p-8">
    <div className="mx-auto max-w-7xl space-y-6">

      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-serif text-3xl text-[#302a24]">
            Order Details
          </h1>
          <p className="mt-1 text-sm text-[#82786d]">
            #{order?.id}
          </p>
        </div>

        <Link
          to="/admin/orders"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#655747] transition hover:text-black"
        >
          <ArrowLeft size={17} />
          Back to Orders
        </Link>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-3">

        {/* Customer and Items */}
        <div className="overflow-hidden rounded-xl border border-[#e5dbce] bg-[#fcfaf6] lg:col-span-2">

          {/* Customer Information */}
          <div className="grid grid-cols-1 gap-6 border-b border-[#e9e0d5] p-5 sm:grid-cols-2 sm:p-6">
            <div>
              <h2 className="mb-4 font-serif text-lg text-[#302a24]">
                Customer Information
              </h2>

              <div className="space-y-2 text-sm text-[#655c52]">
                <p className="font-medium text-[#302a24]">
                  {order?.customer?.name}
                </p>
                <p className="flex items-center gap-2 break-all">
                  <Mail size={15} className="shrink-0 text-[#9a8b78]" />
                  {order?.customer?.email}
                </p>
                {order?.customer?.phone && (
                  <p className="flex items-center gap-2">
                    <Phone size={15} className="shrink-0 text-[#9a8b78]" />
                    {order.customer.phone}
                  </p>
                )}
                {order?.customer?.paymentMethod && (
                  <p className="flex items-center gap-2 capitalize">
                    <CreditCard size={15} className="shrink-0 text-[#9a8b78]" />
                    {order.customer.paymentMethod}
                  </p>
                )}
              </div>
            </div>

            <div>
              <h2 className="mb-4 font-serif text-lg text-[#302a24]">
                Shipping Address
              </h2>

              <div className="space-y-2 text-sm text-[#655c52]">
                <p className="font-medium text-[#302a24]">
                  {order?.customer?.name}
                </p>
                <p>{order?.customer?.address}</p>
                <p>
                  {order?.customer?.city}
                  {order?.customer?.pincode &&
                    `, ${order.customer.pincode}`}
                </p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="p-5 sm:p-6">
            <h2 className="mb-4 font-serif text-lg text-[#302a24]">
              Items ({order?.items?.length ?? 0})
            </h2>

            <div className="divide-y divide-[#e9e0d5]">
              {order?.items?.map((item, index) => (
                <div
                  key={item.id ?? item.productId ?? index}
                  className="flex flex-col gap-3 py-5 first:pt-1 last:pb-1 sm:flex-row sm:items-center"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-4">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-[#eee5d9] bg-[#f3ede4]">
                     
                      <img src={item.image} alt="" />
                    </div>

                    <div className="min-w-0">
                      <p className="font-medium text-[#302a24]">
                        {item.name}
                      </p>
                      <p className="mt-1 text-sm text-[#82786d]">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-[#655c52] sm:w-28 sm:text-center">
                    {item.quantity} × ₹
                    {Number(item.price).toLocaleString("en-IN")}
                  </p>

                  <p className="font-medium text-[#302a24] sm:w-28 sm:text-right">
                    ₹
                    {(Number(item.quantity) * Number(item.price)).toLocaleString(
                      "en-IN"
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Status and Summary */}
        <div className="space-y-5">

          {/* Order Status */}
          <div className="rounded-xl border border-[#e5dbce] bg-[#fcfaf6] p-5 sm:p-6">
            <h2 className="font-serif text-lg text-[#302a24]">
              Order Status
            </h2>

            <div className="mt-4 flex items-center gap-2 rounded-lg border border-[#e0d6c9] bg-[#f9f5ee] px-4 py-3">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  order?.status === "delivered"
                    ? "bg-emerald-600"
                    : order?.status === "shipped"
                    ? "bg-sky-600"
                    : order?.status === "cancelled"
                    ? "bg-rose-600"
                    : "bg-amber-500"
                }`}
              />
              <span className="text-sm capitalize text-[#40382f]">
                {order?.status}
              </span>
            </div>
          </div>

          {/* Order Summary */}
          <div className="rounded-xl border border-[#e5dbce] bg-[#fcfaf6] p-5 sm:p-6">
            <h2 className="mb-5 font-serif text-lg text-[#302a24]">
              Order Summary
            </h2>

            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between gap-3 text-[#82786d]">
                <span>Subtotal</span>
                <span className="text-[#40382f]">
                  ₹
                  {Number(
                    order?.items?.reduce(
                      (sum, item) =>
                        sum + Number(item.price) * Number(item.quantity),
                      0
                    ) ?? 0
                  ).toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 text-[#82786d]">
                <span>Shipping</span>
                <span className="text-[#40382f]">₹0</span>
              </div>

              <div className="border-t border-[#e9e0d5] pt-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-medium text-[#302a24]">Total</span>
                  <span className="font-serif text-xl font-semibold text-[#302a24]">
                    ₹{Number(order?.total ?? 0).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
)
}

export default AdminOrderDetails