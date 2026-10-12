import { useState } from "react";
import {
  Check,
  Coffee,
  ArrowRight,
  Clock3,
  PackageCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useCart, formatPrice } from "../context/CartContext";

const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/orders`;

// Each coffee is connected to its own local image.
const COFFEE_IMAGES = {
  cappuccino: "/images/cappuccino.jpg",
  "caramel macchiato": "/images/caramel-macchiato.jpg",
  "cold brew": "/images/cold-brew.jpg",
  "iced mocha": "/images/iced-mocha.jpg",
  "velvet latte": "/images/velvet-latte.jpg",
};

function getCoffeeImage(item) {
  if (item.imageSrc) {
    return item.imageSrc;
  }

  const productName = (item.name || "").trim().toLowerCase();

  return COFFEE_IMAGES[productName] || "";
}

function CoffeeProductImage({ item, className = "" }) {
  const [imageFailed, setImageFailed] = useState(false);
  const imageSrc = getCoffeeImage(item);

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-xl bg-[#E8D8C5] ${className}`}
    >
      {imageSrc && !imageFailed ? (
        <img
          src={imageSrc}
          alt={item.name || "Coffee"}
          loading="lazy"
          onError={() => setImageFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-[#6B4226]">
          <Coffee size={24} strokeWidth={1.4} />
        </div>
      )}
    </div>
  );
}

function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [customer, setCustomer] = useState({
    fullName: "",
    phone: "",
    address: "",
  });

  const deliveryFee = cartItems.length > 0 ? 250 : 0;
  const grandTotal = cartTotal + deliveryFee;

  async function handleSubmit(event) {
    event.preventDefault();

    if (cartItems.length === 0 || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const nameParts = customer.fullName.trim().split(/\s+/);
      const firstName = nameParts.shift() || "";
      const lastName = nameParts.join(" ");

      const orderPayload = {
        firstName,
        lastName,
        phone: customer.phone.trim(),
        address: customer.address.trim(),
        items: cartItems.map((item) => ({
          productId: String(item.id ?? item._id ?? ""),
          quantity: Number(item.quantity),
        })),
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
      });

      const contentType = response.headers.get("content-type") || "";

      const result = contentType.includes("application/json")
        ? await response.json()
        : { error: await response.text() };

      if (!response.ok) {
        throw new Error(
          result.error || `Unable to place order (${response.status}).`
        );
      }

      if (!result.id) {
        throw new Error(
          "The server response did not include an order ID."
        );
      }

      const savedOrder = {
        orderNumber: `BR-${String(result.id).slice(-6).toUpperCase()}`,

        customer: {
          fullName: [result.firstName, result.lastName]
            .filter(Boolean)
            .join(" "),
          phone: result.phone || customer.phone,
          address: result.address || customer.address,
        },

        items: (result.items || []).map((item) => {
          const savedItem = {
            ...item,
            id: item.productId || item.id || item.name,
          };

          return {
            ...savedItem,
            imageSrc: getCoffeeImage(savedItem),
          };
        }),

        subtotal: Number(result.subtotal || 0),
        deliveryFee: Number(result.deliveryFee || 0),
        total: Number(result.total || 0),
        status: result.status || "PLACED",
      };

      setConfirmedOrder(savedOrder);
      setOrderPlaced(true);
      clearCart();
    } catch (error) {
      console.error("Order submission failed:", error);

      setSubmitError(
        error.message || "Unable to place your order. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  // ORDER CONFIRMATION PAGE
  if (orderPlaced && confirmedOrder) {
    return (
      <section className="min-h-screen bg-[#FAF7F2] px-5 py-14 text-[#24150F]">
        <div className="mx-auto max-w-3xl">
          {/* Brand */}
          <a
            href="/"
            className="flex items-center justify-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#24150F] text-[#F3E9DC]">
              <Coffee size={21} />
            </div>

            <span className="text-xl font-semibold tracking-tight">
              BrewRush
            </span>
          </a>

          {/* Success message */}
          <div className="mt-12 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#E7D4BC]">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#6B4226] text-white">
                <Check size={26} strokeWidth={2.5} />
              </div>
            </div>

            <p className="mt-7 text-xs font-semibold uppercase tracking-[0.3em] text-[#A66A3F]">
              Thank you for choosing us
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              Order received.
            </h1>

            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#806A5A]">
              Your order has been saved. Here is your order confirmation.
            </p>
          </div>

          {/* Order confirmation */}
          <div className="mt-10 overflow-hidden rounded-3xl border border-[#D8C7B5] bg-white">
            <div className="flex flex-col gap-4 bg-[#24150F] px-6 py-6 text-[#F3E9DC] sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <div>
                <p className="text-xs text-[#D8C7B5]">
                  Order reference
                </p>

                <h2 className="mt-2 text-xl font-semibold tracking-wide">
                  {confirmedOrder.orderNumber}
                </h2>
              </div>

              <div className="flex w-fit items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs">
                <span className="h-2 w-2 rounded-full bg-[#D9B68C]" />
                {confirmedOrder.status}
              </div>
            </div>

            <div className="p-6 sm:p-8">
              {/* Customer details */}
              <div className="mb-8 rounded-2xl bg-[#F3E9DC] p-5">
                <h2 className="text-lg font-semibold">
                  Delivery Details
                </h2>

                <p className="mt-3 text-sm font-medium">
                  {confirmedOrder.customer.fullName}
                </p>

                <p className="mt-2 text-sm text-[#806A5A]">
                  {confirmedOrder.customer.phone}
                </p>

                <p className="mt-2 whitespace-pre-line text-sm leading-6 text-[#806A5A]">
                  {confirmedOrder.customer.address}
                </p>
              </div>

              {/* Ordered coffee items */}
              <h2 className="text-lg font-semibold">
                Your coffee selection
              </h2>

              <div className="mt-5 space-y-4">
                {confirmedOrder.items.map((item, index) => (
                  <div
                    key={item.id ?? item.name ?? index}
                    className="flex items-center justify-between gap-4 border-b border-[#E8D8C5] pb-4"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <CoffeeProductImage
                        item={item}
                        className="h-16 w-16"
                      />

                      <div className="min-w-0">
                        <p className="break-words font-medium">
                          {item.name || "Coffee"}
                        </p>

                        <p className="mt-1 text-xs text-[#806A5A]">
                          Quantity: {item.quantity}
                        </p>

                        <p className="mt-1 text-xs text-[#806A5A]">
                          {formatPrice(Number(item.price || 0))} each
                        </p>
                      </div>
                    </div>

                    <p className="shrink-0 text-right text-sm font-semibold">
                      {formatPrice(
                        Number(item.price || 0) *
                          Number(item.quantity || 0)
                      )}
                    </p>
                  </div>
                ))}
              </div>

              {/* Price summary */}
              <div className="mt-6 space-y-3">
                <div className="flex justify-between gap-4 text-sm text-[#806A5A]">
                  <span>Subtotal</span>
                  <span>{formatPrice(confirmedOrder.subtotal)}</span>
                </div>

                <div className="flex justify-between gap-4 text-sm text-[#806A5A]">
                  <span>Delivery fee</span>
                  <span>{formatPrice(confirmedOrder.deliveryFee)}</span>
                </div>

                <div className="flex justify-between gap-4 border-t border-[#D8C7B5] pt-5">
                  <span className="font-semibold">Order total</span>

                  <span className="text-xl font-semibold sm:text-2xl">
                    {formatPrice(confirmedOrder.total)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Order progress */}
          <div className="mt-6 rounded-3xl border border-[#D8C7B5] bg-white p-6 sm:p-8">
            <h2 className="text-lg font-semibold">
              What happens next?
            </h2>

            <div className="mt-7 grid grid-cols-3 gap-3">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#6B4226] text-white">
                  <Check size={18} />
                </div>

                <p className="mt-3 text-sm font-semibold">Received</p>

                <p className="mt-1 text-xs leading-5 text-[#806A5A]">
                  Order saved
                </p>
              </div>

              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3E9DC] text-[#6B4226]">
                  <Coffee size={18} />
                </div>

                <p className="mt-3 text-sm font-semibold">Preparing</p>

                <p className="mt-1 text-xs leading-5 text-[#806A5A]">
                  Awaiting preparation
                </p>
              </div>

              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3E9DC] text-[#6B4226]">
                  <PackageCheck size={18} />
                </div>

                <p className="mt-3 text-sm font-semibold">Delivery</p>

                <p className="mt-1 text-xs leading-5 text-[#806A5A]">
                  Awaiting dispatch
                </p>
              </div>
            </div>

            <div className="mt-6 flex gap-3 rounded-2xl bg-[#F3E9DC]/70 p-4">
              <Clock3
                className="mt-0.5 shrink-0 text-[#6B4226]"
                size={19}
              />

              <p className="text-xs leading-6 text-[#806A5A]">
                Check your latest order status using the Track My Order
                button below.
              </p>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <Link
              to="/track-order"
              state={{
                reference: confirmedOrder.orderNumber,
                phone: confirmedOrder.customer.phone,
              }}
              className="flex items-center justify-center gap-2 rounded-full bg-[#24150F] px-5 py-4 text-sm font-semibold text-[#F3E9DC] transition hover:bg-[#6B4226]"
            >
              Track My Order
              <ArrowRight size={17} />
            </Link>

            <a
              href="/#full-menu"
              className="flex items-center justify-center gap-2 rounded-full border border-[#CDB8A3] px-5 py-4 text-sm font-semibold text-[#3A2117] transition hover:bg-[#F3E9DC]"
            >
              Continue Shopping
            </a>

            <a
              href="/"
              className="flex items-center justify-center rounded-full border border-[#CDB8A3] px-5 py-4 text-sm font-semibold text-[#3A2117] transition hover:bg-[#F3E9DC]"
            >
              Back to Home
            </a>
          </div>

          <p className="mt-8 text-center text-xs text-[#806A5A]">
            Brewed with care, delivered with love.
          </p>
        </div>
      </section>
    );
  }

  // CHECKOUT PAGE
  return (
    <section className="min-h-screen bg-[#F3E9DC] px-6 py-16 text-[#24150F] lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A66A3F]">
          BrewRush Order
        </p>

        <h1 className="mt-3 text-4xl font-semibold">Checkout</h1>

        <p className="mt-3 text-[#806A5A]">
          Your favourite coffee, delivered to your door.
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {/* Delivery form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-2xl border border-[#D8C7B5] bg-[#FAF7F2] p-6"
          >
            <h2 className="text-xl font-semibold">Delivery Details</h2>

            <div>
              <label
                htmlFor="fullName"
                className="mb-2 block text-sm"
              >
                Full Name
              </label>

              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                placeholder="Enter your name"
                value={customer.fullName}
                onChange={(event) =>
                  setCustomer({
                    ...customer,
                    fullName: event.target.value,
                  })
                }
                required
                className="w-full rounded-xl border border-[#D8C7B5] bg-white p-3 outline-none focus:border-[#A66A3F]"
              />
            </div>

            <div>
              <label htmlFor="phone" className="mb-2 block text-sm">
                Phone Number
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="Enter your phone number"
                value={customer.phone}
                onChange={(event) =>
                  setCustomer({
                    ...customer,
                    phone: event.target.value,
                  })
                }
                required
                className="w-full rounded-xl border border-[#D8C7B5] bg-white p-3 outline-none focus:border-[#A66A3F]"
              />
            </div>

            <div>
              <label htmlFor="address" className="mb-2 block text-sm">
                Delivery Address
              </label>

              <textarea
                id="address"
                name="address"
                autoComplete="street-address"
                placeholder="Enter your delivery address"
                value={customer.address}
                onChange={(event) =>
                  setCustomer({
                    ...customer,
                    address: event.target.value,
                  })
                }
                required
                rows={4}
                className="w-full rounded-xl border border-[#D8C7B5] bg-white p-3 outline-none focus:border-[#A66A3F]"
              />
            </div>

            {submitError && (
              <p
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800"
              >
                {submitError}
              </p>
            )}

            <button
              type="submit"
              disabled={cartItems.length === 0 || isSubmitting}
              className="w-full rounded-full bg-[#24150F] py-3.5 text-sm font-semibold text-[#F3E9DC] transition hover:bg-[#6B4226] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Placing Order..." : "Place Order"}
            </button>

            {cartItems.length === 0 && (
              <p className="text-center text-xs text-[#806A5A]">
                Add coffee to your cart before placing an order.
              </p>
            )}
          </form>

          {/* Order summary */}
          <div className="h-fit rounded-2xl border border-[#D8C7B5] bg-[#FAF7F2] p-6">
            <h2 className="text-xl font-semibold">Your Order</h2>

            {cartItems.length === 0 ? (
              <p className="mt-5 text-sm text-[#806A5A]">
                Your cart is empty. Please add coffee from the menu first.
              </p>
            ) : (
              <>
                <div className="mt-5 space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id ?? item._id ?? item.name}
                      className="flex items-center justify-between gap-4 border-b border-[#D8C7B5] pb-4"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <CoffeeProductImage
                          item={item}
                          className="h-16 w-16"
                        />

                        <div className="min-w-0">
                          <p className="break-words font-medium">
                            {item.name}
                          </p>

                          <p className="mt-1 text-sm text-[#806A5A]">
                            {formatPrice(item.price)} × {item.quantity}
                          </p>
                        </div>
                      </div>

                      <p className="shrink-0 text-right font-semibold">
                        {formatPrice(
                          Number(item.price || 0) *
                            Number(item.quantity || 0)
                        )}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Price summary */}
                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between gap-4">
                    <span className="text-[#806A5A]">Subtotal</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-[#806A5A]">Delivery fee</span>
                    <span>{formatPrice(deliveryFee)}</span>
                  </div>

                  <div className="flex justify-between gap-4 border-t border-[#D8C7B5] pt-4 text-lg font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(grandTotal)}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;