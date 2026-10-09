import { useState } from "react";
import {
  Check,
  Coffee,
  ArrowRight,
  Clock3,
  PackageCheck,
} from "lucide-react";
import { useCart } from "../context/CartContext";

function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  const [customer, setCustomer] = useState({
    fullName: "",
    phone: "",
    address: "",
  });

  const deliveryFee = cartItems.length > 0 ? 2.5 : 0;
  const grandTotal = cartTotal + deliveryFee;

  function handleSubmit(event) {
    event.preventDefault();

    if (cartItems.length === 0) {
      return;
    }

    const newOrder = {
      orderNumber: `BR-${Date.now().toString().slice(-6)}`,
      customer: { ...customer },
      items: cartItems.map((item) => ({ ...item })),
      subtotal: cartTotal,
      deliveryFee,
      total: grandTotal,
    };

    setConfirmedOrder(newOrder);
    setOrderPlaced(true);
    clearCart();
  }

  // Order confirmation page
  if (orderPlaced && confirmedOrder) {
    return (
      <section className="min-h-screen bg-[#FAF7F2] px-5 py-14 text-[#24150F]">
        <div className="mx-auto max-w-3xl">
          {/* Brand */}
          <a href="/" className="flex items-center justify-center gap-3">
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
              Your coffee moment is one step closer. Here is a
              summary of your order.
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
                Demo order submitted
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
                {confirmedOrder.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between gap-4 border-b border-[#E8D8C5] pb-4"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F3E9DC] text-[#6B4226]">
                        <Coffee size={21} />
                      </div>

                      <div>
                        <p className="font-medium">{item.name}</p>

                        <p className="mt-1 text-xs text-[#806A5A]">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>

                    <p className="shrink-0 text-sm font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Price summary */}
              <div className="mt-6 space-y-3">
                <div className="flex justify-between text-sm text-[#806A5A]">
                  <span>Subtotal</span>
                  <span>
                    ${confirmedOrder.subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-sm text-[#806A5A]">
                  <span>Delivery fee</span>
                  <span>
                    ${confirmedOrder.deliveryFee.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between border-t border-[#D8C7B5] pt-5">
                  <span className="font-semibold">Order total</span>

                  <span className="text-2xl font-semibold">
                    ${confirmedOrder.total.toFixed(2)}
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
                  Order submitted
                </p>
              </div>

              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3E9DC] text-[#6B4226]">
                  <Coffee size={18} />
                </div>

                <p className="mt-3 text-sm font-semibold">
                  Preparing
                </p>

                <p className="mt-1 text-xs leading-5 text-[#806A5A]">
                  Coffee preparation
                </p>
              </div>

              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3E9DC] text-[#6B4226]">
                  <PackageCheck size={18} />
                </div>

                <p className="mt-3 text-sm font-semibold">Delivery</p>

                <p className="mt-1 text-xs leading-5 text-[#806A5A]">
                  On its way
                </p>
              </div>
            </div>

            <div className="mt-6 flex gap-3 rounded-2xl bg-[#F3E9DC]/70 p-4">
              <Clock3
                className="mt-0.5 shrink-0 text-[#6B4226]"
                size={19}
              />

              <p className="text-xs leading-6 text-[#806A5A]">
                This is a confirmation preview. Live preparation
                and delivery updates will be available when order
                tracking is connected.
              </p>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="/#full-menu"
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#24150F] px-6 py-4 text-sm font-semibold text-[#F3E9DC] transition hover:bg-[#6B4226]"
            >
              Continue Shopping
              <ArrowRight size={17} />
            </a>

            <a
              href="/"
              className="flex flex-1 items-center justify-center rounded-full border border-[#CDB8A3] px-6 py-4 text-sm font-semibold text-[#3A2117] transition hover:bg-[#F3E9DC]"
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

  // Checkout page
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
            <h2 className="text-xl font-semibold">
              Delivery Details
            </h2>

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
              <label
                htmlFor="phone"
                className="mb-2 block text-sm"
              >
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
              <label
                htmlFor="address"
                className="mb-2 block text-sm"
              >
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

            <button
              type="submit"
              disabled={cartItems.length === 0}
              className="w-full rounded-full bg-[#24150F] py-3.5 text-sm font-semibold text-[#F3E9DC] transition hover:bg-[#6B4226] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Place Order
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
                Your cart is empty. Please add coffee from the
                menu first.
              </p>
            ) : (
              <>
                <div className="mt-5 space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.name}
                      className="flex justify-between gap-4 border-b border-[#D8C7B5] pb-4"
                    >
                      <div>
                        <p className="font-medium">{item.name}</p>

                        <p className="mt-1 text-sm text-[#806A5A]">
                          ${item.price.toFixed(2)} × {item.quantity}
                        </p>
                      </div>

                      <p className="font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#806A5A]">Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#806A5A]">
                      Delivery fee
                    </span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between border-t border-[#D8C7B5] pt-4 text-lg font-semibold">
                    <span>Total</span>
                    <span>${grandTotal.toFixed(2)}</span>
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