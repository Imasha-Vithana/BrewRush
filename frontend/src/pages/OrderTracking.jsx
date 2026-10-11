
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Coffee,
  Search,
  PackageCheck,
  Clock3,
  ArrowLeft,
} from "lucide-react";
import { formatPrice } from "../context/CartContext";

const API_URL = "http://localhost:8080/api/orders";

const statusLabels = {
  PLACED: "Order Placed",
  PREPARING: "Preparing Your Coffee",
  OUT_FOR_DELIVERY: "Out for Delivery",
  DELIVERED: "Delivered",
};

function OrderTracking() {
  const location = useLocation();

  // Prefill information received from the Checkout confirmation page.
  const [reference, setReference] = useState(
    () => location.state?.reference || ""
  );

  const [phone, setPhone] = useState(
    () => location.state?.phone || ""
  );

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleTrack(event) {
    event.preventDefault();

    if (loading) return;

    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const cleanReference = reference.trim().toUpperCase();
      const cleanPhone = phone.trim();

      const response = await fetch(
        `${API_URL}/${encodeURIComponent(cleanReference)}/track?phone=${encodeURIComponent(cleanPhone)}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Order not found. Please check your details."
        );
      }

      setOrder(data);
    } catch (err) {
      console.error("Order tracking error:", err);

      setError(
        err.message ||
          "Unable to track your order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  // Automatically refresh the order status every 10 seconds.
  useEffect(() => {
    if (!order?.id || !reference.trim() || !phone.trim()) {
      return;
    }

    const controller = new AbortController();

    async function refreshOrderStatus() {
      try {
        const cleanReference = reference.trim().toUpperCase();
        const cleanPhone = phone.trim();

        const response = await fetch(
          `${API_URL}/${encodeURIComponent(cleanReference)}/track?phone=${encodeURIComponent(cleanPhone)}`,
          {
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          return;
        }

        const latestOrder = await response.json();

        if (!controller.signal.aborted) {
          setOrder(latestOrder);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Automatic status refresh failed:", err);
        }
      }
    }

    const intervalId = window.setInterval(
      refreshOrderStatus,
      10000
    );

    return () => {
      controller.abort();
      window.clearInterval(intervalId);
    };
  }, [order?.id, reference, phone]);

  const orderStages = Object.entries(statusLabels);

  const currentStageIndex = orderStages.findIndex(
    ([status]) => status === order?.status
  );

  return (
    <main className="min-h-screen bg-[#F3E9DC] px-5 py-14 text-[#24150F] sm:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center justify-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#24150F] text-[#F3E9DC]">
            <Coffee size={21} />
          </div>

          <span className="text-xl font-semibold">BrewRush</span>
        </Link>

        {/* Page heading */}
        <div className="mt-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A66A3F]">
            BrewRush Delivery
          </p>

          <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">
            Track your order.
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#806A5A]">
            Enter your order reference and phone number to check
            the latest status of your coffee order.
          </p>
        </div>

        {/* Tracking form */}
        <form
          onSubmit={handleTrack}
          className="mt-10 space-y-5 rounded-3xl border border-[#D8C7B5] bg-[#FAF7F2] p-6 sm:p-8"
        >
          <div>
            <label
              htmlFor="orderReference"
              className="mb-2 block text-sm font-medium"
            >
              Order Reference
            </label>

            <input
              id="orderReference"
              type="text"
              placeholder="Example: BR-210BC3"
              value={reference}
              onChange={(event) => {
                setReference(event.target.value);
                setOrder(null);
                setError("");
              }}
              required
              className="w-full rounded-xl border border-[#D8C7B5] bg-white p-3 outline-none focus:border-[#A66A3F]"
            />
          </div>

          <div>
            <label
              htmlFor="trackingPhone"
              className="mb-2 block text-sm font-medium"
            >
              Phone Number
            </label>

            <input
              id="trackingPhone"
              type="tel"
              autoComplete="tel"
              placeholder="Enter the phone number used at checkout"
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
                setOrder(null);
                setError("");
              }}
              required
              className="w-full rounded-xl border border-[#D8C7B5] bg-white p-3 outline-none focus:border-[#A66A3F]"
            />
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#24150F] py-3.5 text-sm font-semibold text-[#F3E9DC] transition hover:bg-[#6B4226] disabled:cursor-wait disabled:opacity-60"
          >
            <Search size={17} />
            {loading ? "Checking Order..." : "Track Order"}
          </button>
        </form>

        {/* Order result */}
        {order && (
          <section
            aria-live="polite"
            className="mt-8 overflow-hidden rounded-3xl border border-[#D8C7B5] bg-[#FAF7F2]"
          >
            <div className="bg-[#24150F] p-6 text-[#F3E9DC] sm:p-8">
              <p className="text-xs text-[#CDB8A3]">
                Order Reference
              </p>

              <h2 className="mt-2 break-all text-2xl font-semibold">
                BR-{String(order.id).slice(-6).toUpperCase()}
              </h2>

              <p className="mt-4 text-xs text-[#CDB8A3]">
                Current Status
              </p>

              <p className="mt-1 text-lg font-semibold">
                {statusLabels[order.status] || order.status}
              </p>
            </div>

            <div className="p-6 sm:p-8">
              {/* Order progress */}
              <div className="flex items-start gap-3">
                <PackageCheck
                  size={22}
                  className="mt-0.5 shrink-0 text-[#6B4226]"
                />

                <div className="flex-1">
                  <h3 className="font-semibold">Order Progress</h3>

                  <div className="mt-4 space-y-4">
                    {orderStages.map(([status, label], index) => {
                      const completed =
                        currentStageIndex >= 0 &&
                        index <= currentStageIndex;

                      return (
                        <div
                          key={status}
                          className="flex items-center gap-3"
                        >
                          <span
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                              completed
                                ? "bg-[#6B4226] text-white"
                                : "border border-[#CDB8A3] bg-white"
                            }`}
                          >
                            {completed && (
                              <span className="text-xs">✓</span>
                            )}
                          </span>

                          <span
                            className={`text-sm ${
                              completed
                                ? "font-semibold text-[#3A2117]"
                                : "text-[#9D8979]"
                            }`}
                          >
                            {label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Ordered coffees */}
              <div className="mt-7 border-t border-[#D8C7B5] pt-6">
                <h3 className="font-semibold">Your Coffee</h3>

                <div className="mt-4 space-y-4">
                  {(order.items || []).map((item, index) => (
                    <div
                      key={`${item.productId || item.name}-${index}`}
                      className="flex items-center justify-between gap-4"
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
                            Quantity: {item.quantity}
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

                {/* Price summary */}
                <div className="mt-6 space-y-3 border-t border-[#D8C7B5] pt-5 text-sm">
                  <div className="flex justify-between gap-4">
                    <span className="text-[#806A5A]">Subtotal</span>
                    <span>{formatPrice(order.subtotal)}</span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-[#806A5A]">Delivery Fee</span>
                    <span>{formatPrice(order.deliveryFee)}</span>
                  </div>

                  <div className="flex justify-between gap-4 border-t border-[#D8C7B5] pt-4 text-base font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(order.total)}</span>
                  </div>
                </div>

                {order.createdAt && (
                  <p className="mt-5 flex items-center gap-2 text-xs text-[#806A5A]">
                    <Clock3 size={15} />
                    Ordered on{" "}
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                )}

                <p className="mt-3 text-xs text-[#806A5A]">
                  Order status refreshes automatically every 10 seconds
                  while this page remains open.
                </p>
              </div>
            </div>
          </section>
        )}

        <Link
          to="/"
          className="mx-auto mt-8 flex w-fit items-center gap-2 text-sm font-medium text-[#6B4226] transition hover:text-[#A66A3F]"
        >
          <ArrowLeft size={16} />
          Back to BrewRush
        </Link>

        <p className="mt-8 text-center text-xs text-[#806A5A]">
          Brewed with care, delivered with love.
        </p>
      </div>
    </main>
  );
}

export default OrderTracking;
