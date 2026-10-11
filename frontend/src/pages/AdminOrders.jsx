
import { useEffect, useState } from "react";
import { RefreshCw, PackageCheck, Coffee } from "lucide-react";
import { formatPrice } from "../context/CartContext";

const API_URL = "http://localhost:8080/api/orders";

const ORDER_STATUSES = [
  { value: "PLACED", label: "Placed" },
  { value: "PREPARING", label: "Preparing" },
  { value: "OUT_FOR_DELIVERY", label: "Out for Delivery" },
  { value: "DELIVERED", label: "Delivered" },
];

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const [statusError, setStatusError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  async function fetchOrders(signal) {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL, { signal });

      if (!response.ok) {
        throw new Error(`Failed to load orders (${response.status}).`);
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Invalid orders data received.");
      }

      setOrders(data);
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Orders loading error:", err);
        setError("Unable to load orders. Check that the backend is running.");
      }
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }

  async function updateOrderStatus(orderId, status) {
    setUpdatingOrderId(orderId);
    setStatusError("");
    setStatusMessage("");

    try {
      const response = await fetch(
        `${API_URL}/${encodeURIComponent(orderId)}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const contentType = response.headers.get("content-type") || "";
      const result = contentType.includes("application/json")
        ? await response.json()
        : { error: await response.text() };

      if (!response.ok) {
        throw new Error(
          result.error || `Status update failed (${response.status}).`
        );
      }

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order.id === orderId ? result : order
        )
      );

      setStatusMessage(`Order status updated to ${status.replaceAll("_", " ")}.`);
    } catch (err) {
      console.error("Status update failed:", err);
      setStatusError(
        err.message || "Unable to update order status. Please try again."
      );
    } finally {
      setUpdatingOrderId(null);
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    fetchOrders(controller.signal);

    return () => controller.abort();
  }, []);

  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0
  );

  return (
    <main className="min-h-screen bg-[#F3E9DC] px-5 py-12 text-[#24150F] sm:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page heading */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A66A3F]">
              BrewRush Management
            </p>

            <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
              Customer Orders
            </h1>

            <p className="mt-3 text-sm text-[#806A5A]">
              View orders and update their delivery status.
            </p>
          </div>

          <button
            type="button"
            onClick={() => fetchOrders()}
            disabled={loading}
            className="flex w-fit items-center gap-2 rounded-full bg-[#24150F] px-5 py-3 text-sm font-semibold text-[#F3E9DC] transition hover:bg-[#6B4226] disabled:opacity-60"
          >
            <RefreshCw size={16} />
            Refresh Orders
          </button>
        </div>

        {/* Status messages */}
        {statusError && (
          <p
            role="alert"
            className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
          >
            {statusError}
          </p>
        )}

        {statusMessage && (
          <p
            role="status"
            className="mt-5 rounded-xl border border-[#CDB8A3] bg-[#FAF7F2] p-4 text-sm text-[#3A2117]"
          >
            {statusMessage}
          </p>
        )}

        {/* Summary cards */}
        {!loading && !error && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#D8C7B5] bg-[#FAF7F2] p-6">
              <p className="text-sm text-[#806A5A]">Total Orders</p>
              <p className="mt-2 text-3xl font-semibold">
                {orders.length}
              </p>
            </div>

            <div className="rounded-2xl border border-[#D8C7B5] bg-[#FAF7F2] p-6">
              <p className="text-sm text-[#806A5A]">
                Combined Order Value
              </p>
              <p className="mt-2 text-3xl font-semibold">
                {formatPrice(totalRevenue)}
              </p>
            </div>
          </div>
        )}

        {/* Orders */}
        {loading ? (
          <p className="py-20 text-center text-sm text-[#806A5A]">
            Loading orders...
          </p>
        ) : error ? (
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-800">
            {error}
          </div>
        ) : orders.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-[#D8C7B5] bg-[#FAF7F2] p-10 text-center">
            <PackageCheck
              className="mx-auto text-[#A66A3F]"
              size={32}
            />
            <p className="mt-4 font-semibold">No orders yet</p>
            <p className="mt-2 text-sm text-[#806A5A]">
              New customer orders will appear here.
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-6">
            {orders.map((order) => (
              <article
                key={order.id}
                className="overflow-hidden rounded-3xl border border-[#D8C7B5] bg-[#FAF7F2]"
              >
                {/* Order header and status dropdown */}
                <div className="flex flex-col justify-between gap-4 bg-[#24150F] px-6 py-5 text-[#F3E9DC] sm:flex-row sm:items-center">
                  <div>
                    <p className="text-xs text-[#CDB8A3]">
                      Order ID
                    </p>

                    <h2 className="mt-1 break-all text-lg font-semibold">
                      {order.id}
                    </h2>

                    <p className="mt-2 text-xs text-[#CDB8A3]">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleString()
                        : "Date unavailable"}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 sm:items-end">
                    <label
                      htmlFor={`status-${order.id}`}
                      className="text-xs text-[#CDB8A3]"
                    >
                      Update Order Status
                    </label>

                    <select
                      id={`status-${order.id}`}
                      value={order.status || "PLACED"}
                      onChange={(event) =>
                        updateOrderStatus(order.id, event.target.value)
                      }
                      disabled={updatingOrderId === order.id}
                      className="w-full max-w-[230px] rounded-full border border-white/20 bg-[#24150F] px-4 py-2.5 text-sm font-semibold text-white outline-none focus:border-[#D9B68C] disabled:cursor-wait disabled:opacity-60"
                    >
                      {ORDER_STATUSES.map((status) => (
                        <option
                          key={status.value}
                          value={status.value}
                          className="bg-[#24150F] text-white"
                        >
                          {status.label}
                        </option>
                      ))}
                    </select>

                    {updatingOrderId === order.id && (
                      <span className="text-xs text-[#D8C7B5]">
                        Updating...
                      </span>
                    )}
                  </div>
                </div>

                {/* Customer details and items */}
                <div className="grid gap-6 p-6 lg:grid-cols-2">
                  <section>
                    <h3 className="font-semibold">Customer Details</h3>

                    <p className="mt-3 text-sm">
                      {[order.firstName, order.lastName]
                        .filter(Boolean)
                        .join(" ") || "Name unavailable"}
                    </p>

                    <p className="mt-2 text-sm text-[#806A5A]">
                      {order.phone || "Phone unavailable"}
                    </p>

                    <p className="mt-2 whitespace-pre-line text-sm leading-6 text-[#806A5A]">
                      {order.address || "Address unavailable"}
                    </p>
                  </section>

                  <section>
                    <h3 className="font-semibold">Ordered Coffees</h3>

                    <div className="mt-3 space-y-3">
                      {(order.items || []).map((item, index) => (
                        <div
                          key={`${item.productId || item.name}-${index}`}
                          className="flex items-center justify-between gap-4 rounded-xl bg-[#F3E9DC] p-3"
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            <Coffee
                              size={19}
                              className="shrink-0 text-[#6B4226]"
                            />

                            <div>
                              <p className="text-sm font-medium">
                                {item.name}
                              </p>

                              <p className="mt-1 text-xs text-[#806A5A]">
                                Qty: {item.quantity}
                              </p>
                            </div>
                          </div>

                          <p className="shrink-0 text-sm font-semibold">
                            {formatPrice(
                              Number(item.price || 0) *
                                Number(item.quantity || 0)
                            )}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                {/* Order totals */}
                <div className="border-t border-[#D8C7B5] px-6 py-5">
                  <div className="ml-auto max-w-sm space-y-2 text-sm">
                    <div className="flex justify-between gap-4">
                      <span className="text-[#806A5A]">Subtotal</span>
                      <span>{formatPrice(order.subtotal)}</span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span className="text-[#806A5A]">Delivery Fee</span>
                      <span>{formatPrice(order.deliveryFee)}</span>
                    </div>

                    <div className="flex justify-between gap-4 border-t border-[#D8C7B5] pt-3 text-base font-semibold">
                      <span>Total</span>
                      <span>{formatPrice(order.total)}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default AdminOrders;
