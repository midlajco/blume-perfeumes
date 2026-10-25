
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrdersByUser} from "../services/OrderService";

function Orders() {
  const user = useSelector((state) => state.auth.user);

  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders", user?.id],
    queryFn: () => getOrdersByUser(user.id),
    enabled: !!user,
  });

  if (!user) {
    return <p className="mt-20 text-center">Please log in to view your orders.</p>;
  }

  if (isLoading) {
    return <p className="mt-20 text-center">Loading your orders...</p>;
  }

  if (isError) {
    return <p className="mt-20 text-center">Failed to load your orders.</p>;
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="mt-20 text-center">
        <h1 className="text-2xl font-semibold">Your Orders</h1>
        <p className="mt-4 text-gray-600">
          You haven't placed any orders yet.
        </p>
        <Link
          to="/shop"
          className="mt-6 inline-block underline underline-offset-4"
        >
          Explore fragrances
        </Link>
      </div>
    );
  }

 return (
    <main className="mx-auto max-w-4xl px-6 pb-24 pt-28 text-stone-800">
      <header className="mb-12 border-b border-stone-200 pb-8">
        <p className="mb-3 text-xs uppercase tracking-[0.25em] text-stone-400">
          Order History
        </p>
        <h1 className="font-serif text-4xl font-normal tracking-tight text-stone-900">
          Your Orders
        </h1>
        <p className="mt-3 font-serif text-lg italic text-stone-500">
          A little record of your favourite fragrances.
        </p>
      </header>

      <div className="space-y-10">
        {orders
          .slice()
          .reverse()
          .map((order) => (
            <section
              key={order.id}
              className="overflow-hidden rounded-2xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.08)] ring-1 ring-stone-200/70"
            >
              <div className="flex flex-wrap items-end justify-between gap-6 bg-stone-50/70 px-6 py-5">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-stone-400">
                    Order ID
                  </p>
                  <p className="mt-1 font-mono text-sm text-stone-700">
                    #{order.id}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-stone-400">
                    Placed on
                  </p>
                  <p className="mt-1 text-sm text-stone-700">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div className="text-right sm:text-left">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-stone-400">
                    Status
                  </p>
                  <span className="mt-1 inline-flex items-center rounded-full bg-amber-100/70 px-3 py-1 text-xs font-medium capitalize text-amber-800">
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="divide-y divide-stone-100 px-6">
                {order.items?.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-center gap-5 py-6"
                  >
                    <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-stone-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover transition duration-500 hover:scale-105"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h2 className="font-serif text-lg text-stone-900">
                        {item.name}
                      </h2>
                      <p className="mt-1 text-sm text-stone-500">
                        Quantity {item.quantity}
                      </p>
                    </div>

                    <p className="whitespace-nowrap text-right text-base font-medium text-stone-900">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex items-baseline justify-between border-t border-stone-200 bg-stone-50/40 px-6 py-5">
                <span className="text-sm text-stone-500">Order total</span>
                <span className="font-serif text-2xl text-stone-900">
                  ₹{Number(order.total).toLocaleString("en-IN")}
                </span>
              </div>
            </section>
          ))}
      </div>
      <div className="mt-14 text-center">
  <a
    href="/shop"
    className="inline-flex items-center gap-2 border-b border-stone-900 pb-1 font-serif text-lg italic text-stone-900 transition hover:border-stone-500 hover:text-stone-500"
  >
    Shop more
    <span aria-hidden="true">→</span>
  </a>
</div>
    </main>
  );
}

export default Orders;
