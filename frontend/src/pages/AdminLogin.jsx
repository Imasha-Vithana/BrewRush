import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Coffee,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";

const API_URL = "http://localhost:8080/api/orders";
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
          "The backend encountered an error. Check the MongoDB connection and try again."
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

      // Save the Basic authentication value for this browser tab.
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
    <main className="flex min-h-[calc(100vh-4.5rem)] items-center justify-center bg-[#F3E9DC] px-5 py-12 text-[#24150F]">
      <div className="w-full max-w-md">
        {/* Back to Store */}
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#806A5A] transition hover:text-[#A66A3F]"
        >
          <ArrowLeft size={16} />
          Back to store
        </Link>

        {/* Login Card */}
        <div className="rounded-3xl border border-[#D8C7B5] bg-[#FAF7F2] p-7 shadow-xl sm:p-9">
          {/* Logo */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#24150F] text-[#F3E9DC]">
              <Coffee size={29} />
            </div>

            <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#A66A3F]">
              BrewRush Management
            </p>

            <h1 className="mt-2 text-3xl font-semibold">
              Admin Login
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#806A5A]">
              Sign in to manage customer orders and delivery
              status.
            </p>
          </div>

          {/* Login Form */}
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
                type="text"
                autoComplete="username"
                value={username}
                onChange={(event) =>
                  setUsername(event.target.value)
                }
                placeholder="Enter admin username"
                required
                className="w-full rounded-xl border border-[#D8C7B5] bg-white px-4 py-3.5 text-sm text-[#24150F] outline-none transition placeholder:text-[#A89586] focus:border-[#A66A3F] focus:ring-2 focus:ring-[#A66A3F]/15"
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
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="Enter admin password"
                  required
                  className="w-full rounded-xl border border-[#D8C7B5] bg-white px-4 py-3.5 pr-12 text-sm text-[#24150F] outline-none transition placeholder:text-[#A89586] focus:border-[#A66A3F] focus:ring-2 focus:ring-[#A66A3F]/15"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((current) => !current)
                  }
                  className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-[#806A5A] transition hover:bg-[#F3E9DC] hover:text-[#24150F]"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
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
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#24150F] px-5 py-3.5 text-sm font-semibold text-[#F3E9DC] transition hover:bg-[#6B4226] disabled:cursor-wait disabled:opacity-60"
            >
              <ShieldCheck size={18} />
              {loading ? "Verifying..." : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs leading-5 text-[#806A5A]">
            Authorized administrators only.
          </p>
        </div>
      </div>
    </main>
  );
}

export default AdminLogin;
