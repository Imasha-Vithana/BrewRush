import { useState } from "react";
import {
  Minus,
  Plus,
  Trash2,
  X,
  ShoppingBag,
  Coffee,
} from "lucide-react";
import { useCart, formatPrice } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

// Each coffee name is connected to its own local image.
const COFFEE_IMAGES = {
  cappuccino: "/images/cappuccino.jpg",
  "caramel macchiato": "/images/caramel-macchiato.jpg",
  "cold brew": "/images/cold-brew.jpg",
  "iced mocha": "/images/iced-mocha.jpg",
  "velvet latte": "/images/velvet-latte.jpg",
};

function getCoffeeImage(item) {
  // Use the specific image passed in from the menu if available.
  if (item.imageSrc) {
    return item.imageSrc;
  }

  // Otherwise, find the image using the product name.
  const productName = (item.name || "").trim().toLowerCase();

  return COFFEE_IMAGES[productName] || "";
}

// Displays a product image with a graceful fallback.
function CartItemImage({ item }) {
  const [imageFailed, setImageFailed] = useState(false);
  const imageSrc = getCoffeeImage(item);

  return (
    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#E8D8C5]">
      {imageSrc && !imageFailed ? (
        <img
          src={imageSrc}
          alt={item.name}
          loading="lazy"
          onError={() => setImageFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-[#6B4226]">
          <Coffee size={30} strokeWidth={1.4} />
        </div>
      )}
    </div>
  );
}

function Cart({ isOpen, onClose }) {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    cartTotal,
  } = useCart();

  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          aria-hidden="true"
          onClick={onClose}
          className="fixed inset-0 z-[60] bg-[#24150F]/40 backdrop-blur-sm"
        />
      )}

      {/* Cart Drawer */}
      <aside
        role="dialog"
        aria-modal={isOpen ? "true" : undefined}
        aria-label="Shopping bag"
        aria-hidden={!isOpen}
        className={`fixed right-0 top-0 z-[70] flex h-full w-full max-w-lg flex-col bg-[#FAF7F2] shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#D8C7B5] px-6 py-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A66A3F]">
              Your order
            </p>

            <h2 className="mt-1 text-2xl font-semibold text-[#24150F]">
              Shopping Bag
            </h2>

            <p className="mt-1 text-xs text-[#806A5A]">
              {cartCountText(cartItems.length)}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#5A3828] transition hover:bg-[#E8D8C5]"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-6">
          {cartItems.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E7D4BC] text-[#6B4226]">
                <ShoppingBag size={25} />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-[#24150F]">
                Your bag is empty
              </h3>

              <p className="mt-2 max-w-xs text-sm leading-6 text-[#806A5A]">
                Add your favorite coffee and it will appear here.
              </p>

              <button
                type="button"
                onClick={onClose}
                className="mt-6 rounded-full bg-[#24150F] px-6 py-3 text-xs font-semibold text-[#F3E9DC] transition hover:bg-[#6B4226]"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {cartItems.map((item) => (
                <article
                  key={item.id ?? item._id ?? item.name}
                  className="rounded-2xl border border-[#D8C7B5] bg-white/60 p-4 sm:p-5"
                >
                  {/* Product image and details */}
                  <div className="flex gap-4">
                    <CartItemImage item={item} />

                    <div className="min-w-0 flex-1">
                      <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#A66A3F]">
                        {item.category || "Coffee"}
                      </p>

                      <h3 className="mt-1 break-words font-semibold text-[#24150F]">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-xs text-[#806A5A]">
                        {formatPrice(item.price)} each
                      </p>

                      {/* Quantity controls and line total */}
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center rounded-full border border-[#D8C7B5] bg-[#FAF7F2]">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.quantity - 1
                              )
                            }
                            disabled={item.quantity <= 1}
                            className="flex h-8 w-8 items-center justify-center text-[#5A3828] transition hover:text-[#A66A3F] disabled:cursor-not-allowed disabled:opacity-40"
                            aria-label={`Decrease ${item.name} quantity`}
                          >
                            <Minus size={14} />
                          </button>

                          <span className="w-7 text-center text-xs font-semibold text-[#24150F]">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.quantity + 1
                              )
                            }
                            className="flex h-8 w-8 items-center justify-center text-[#5A3828] transition hover:text-[#A66A3F]"
                            aria-label={`Increase ${item.name} quantity`}
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <p className="text-right text-sm font-semibold text-[#3A2117]">
                          {formatPrice(
                            Number(item.price || 0) *
                              Number(item.quantity || 0)
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Remove item */}
                  <div className="mt-4 border-t border-[#E8D8C5] pt-3">
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#E7C5BC] bg-[#FFF5F2] px-4 py-3 text-sm font-medium text-[#A33B2B] transition hover:border-[#A33B2B] hover:bg-[#FCE4DE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A33B2B]"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <Trash2 size={16} />
                      Remove item
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Cart Summary */}
        {cartItems.length > 0 && (
          <div className="border-t border-[#D8C7B5] bg-[#F3E9DC] px-6 py-6">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm text-[#806A5A]">
                Subtotal
              </span>

              <span className="text-xl font-semibold text-[#24150F]">
                {formatPrice(cartTotal)}
              </span>
            </div>

            <p className="mt-2 text-xs text-[#806A5A]">
              Delivery charges are calculated at checkout.
            </p>

            <button
              type="button"
              onClick={handleCheckout}
              className="mt-5 flex w-full items-center justify-center rounded-full bg-[#24150F] py-3.5 text-sm font-semibold text-[#F3E9DC] transition hover:bg-[#6B4226]"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

function cartCountText(count) {
  return `${count} ${count === 1 ? "item" : "items"} in your bag`;
}

export default Cart;