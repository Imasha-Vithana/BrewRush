import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Coffee,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowLeft,
  LockKeyhole,
  ArrowRight,
} from "lucide-react";

const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/orders`;
const AUTH_KEY = "brewrushAdminAuth";

function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const authToken = window.btoa(
        `${username.trim()}:${password}`
      );

      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Authorization: `Basic ${authToken}`,
        },
      });

      if (response.status === 401) {
        throw new Error("Incorrect username or password.");
      }

      if (response.status === 403) {
        throw new Error(
          "Access denied. This account does not have admin access."
        );
      }

      if (response.status >= 500) {
        throw new Error(
          "The server encountered an error. Please check the backend connection and try again."
        );
      }

      if (!response.ok) {
        throw new Error(
          `Login verification failed (${response.status}).`
        );
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Unexpected response from the server.");
      }

      // Keep the admin authentication for this browser tab.
      sessionStorage.setItem(AUTH_KEY, authToken);

      navigate("/admin/orders", { replace: true });
    } catch (err) {
      console.error("Admin login error:", err);

      setError(
        err.message ||
          "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F3E9DC] px-4 py-10 text-[#24150F] sm:px-6">
      <div className="w-full max-w-5xl overflow-hidden rounded-[2rem] border border-[#D8C7B5] bg-[#FAF7F2] shadow-[0_24px_80px_rgba(36,21,15,0.12)] lg:grid lg:grid-cols-2">

        {/* LEFT BRAND PANEL */}
        <section className="relative hidden min-h-[620px] overflow-hidden bg-[#24150F] p-10 text-[#F3E9DC] lg:flex lg:flex-col lg:justify-between xl:p-14">
          {/* Background decoration */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-[#80604A]/50" />

          <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[#A66A3F]/15 blur-3xl" />

          <div className="relative z-10">
            <Link
              to="/"
              aria-label="Return to BrewRush home"
              className="inline-flex items-center gap-3"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F3E9DC] text-[#24150F]">
                <Coffee size={23} />
              </div>

              <div>
                <span className="block text-xl font-semibold tracking-tight">
                  BrewRush
                </span>

                <span className="text-[9px] uppercase tracking-[0.25em] text-[#B9A294]">
                  Specialty Coffee
                </span>
              </div>
            </Link>
          </div>

          <div className="relative z-10 py-12">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-9 bg-[#C49A6C]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C8A98D]">
                Management Portal
              </span>
            </div>

            <h1 className="text-4xl font-semibold leading-tight tracking-[-0.035em] xl:text-5xl">
              Good coffee.
              <br />
              Smooth
              <br />

              <span className="font-serif italic text-[#C8A98D]">
                operations.
              </span>
            </h1>

            <p className="mt-6 max-w-sm text-sm leading-7 text-[#B9A294]">
              Manage customer orders, monitor order progress, and keep the
              BrewRush experience running smoothly.
            </p>
          </div>

          <div className="relative z-10 border-t border-[#4A3024] pt-6">
            <div className="flex items-center gap-3 text-xs text-[#B9A294]">
              <ShieldCheck size={17} className="text-[#C8A98D]" />

              <span>Restricted access for authorized administrators</span>
            </div>
          </div>
        </section>

        {/* RIGHT LOGIN PANEL */}
        <section className="p-6 sm:p-10 lg:flex lg:flex-col lg:justify-center lg:p-12 xl:p-14">
          {/* Mobile brand */}
          <div className="mb-9 flex items-center justify-between lg:hidden">
            <Link
              to="/"
              className="inline-flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#24150F] text-[#F3E9DC]">
                <Coffee size={20} />
              </div>

              <span className="text-lg font-semibold">
                BrewRush
              </span>
            </Link>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E7D4BC] text-[#6B4226]">
              <LockKeyhole size={17} />
            </div>
          </div>

          {/* Back navigation */}
          <Link
            to="/"
            className="mb-9 hidden w-fit items-center gap-2 text-sm font-medium text-[#806A5A] transition-colors hover:text-[#A66A3F] lg:inline-flex"
          >
            <ArrowLeft size={16} />
            Back to store
          </Link>

          {/* Heading */}
          <div>
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#D8C7B5] bg-[#F3E9DC] text-[#6B4226]">
              <ShieldCheck size={23} strokeWidth={1.6} />
            </div>

            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#A66A3F]">
              Secure administrator access
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Welcome back.
            </h2>

            <p className="mt-3 max-w-sm text-sm leading-6 text-[#806A5A]">
              Sign in to manage customer orders and update delivery status.
            </p>
          </div>

          {/* Login form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="admin-username"
                className="mb-2 block text-sm font-medium text-[#3A2117]"
              >
                Username
              </label>

              <input
                id="admin-username"
                name="username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Enter admin username"
                required
                disabled={loading}
                className="w-full rounded-xl border border-[#D8C7B5] bg-white px-4 py-3.5 text-sm text-[#24150F] outline-none transition placeholder:text-[#A89586] focus:border-[#A66A3F] focus:ring-2 focus:ring-[#A66A3F]/15 disabled:opacity-60"
              />
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="mb-2 block text-sm font-medium text-[#3A2117]"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="admin-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter admin password"
                  required
                  disabled={loading}
                  className="w-full rounded-xl border border-[#D8C7B5] bg-white px-4 py-3.5 pr-12 text-sm text-[#24150F] outline-none transition placeholder:text-[#A89586] focus:border-[#A66A3F] focus:ring-2 focus:ring-[#A66A3F]/15 disabled:opacity-60"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((current) => !current)
                  }
                  className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-[#806A5A] transition hover:bg-[#F3E9DC] hover:text-[#24150F]"
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                  aria-pressed={showPassword}
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Login error */}
            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-800"
              >
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#24150F] px-5 py-3.5 text-sm font-semibold text-[#F3E9DC] transition-all duration-300 hover:bg-[#6B4226] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A66A3F] focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-60"
            >
              <ShieldCheck size={18} />

              {loading ? "Verifying credentials..." : "Sign In"}

              {!loading && (
                <ArrowRight
                  size={16}
                  className="ml-auto transition-transform duration-300 group-hover:translate-x-1"
                />
              )}
            </button>
          </form>

          {/* Security note */}
          <div className="mt-7 flex items-start gap-3 border-t border-[#E2D5C8] pt-5">
            <LockKeyhole
              size={16}
              className="mt-0.5 shrink-0 text-[#A66A3F]"
            />

            <p className="text-xs leading-5 text-[#806A5A]">
              Authorized administrators only. Your login is verified by
              the BrewRush backend.
            </p>
          </div>

          <p className="mt-8 text-center text-xs text-[#A89586] lg:text-left">
            © {new Date().getFullYear()} BrewRush Management
          </p>
        </section>
      </div>
    </main>
  );
}

export default AdminLogin;