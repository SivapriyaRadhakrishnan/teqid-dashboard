import { FormEvent, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, ShieldCheck } from "../icons";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";

type LocationState = {
  from?: {
    pathname?: string;
  };
};

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loading: authLoading, session } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const from =
    (location.state as LocationState | null)?.from?.pathname ??
    "/admin/dashboard";

  useEffect(() => {
    if (!authLoading && session) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [authLoading, navigate, session]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setSubmitting(false);

    if (signInError) {
      setError("Invalid email or password. Please try again.");
      return;
    }

    navigate(from, { replace: true });
  }

  if (!authLoading && session) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-sidebar-from to-sidebar-to px-6 py-8 text-white">
     <div className="mx-auto flex min-h-[calc(100vh-64px)] items-center justify-center">
       

       <section className="w-full max-w-[520px] rounded-[28px] border border-[rgba(15,23,42,0.07)] bg-white p-8 text-text-primary shadow-[0_28px_80px_rgba(2,8,23,0.24)] md:p-10">
          <div>
            <h2 className="text-3xl font-bold tracking-normal text-text-primary">
              Welcome Back
            </h2>
            <p className="mt-3 text-sm leading-6 text-text-secondary">
              Sign in to access the Teqid Renewal Dashboard
            </p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <label className="block">
              <span className="text-sm font-semibold text-text-primary">
                Email
              </span>
              <div className="mt-2 flex h-12 items-center gap-3 rounded-2xl border border-[rgba(15,23,42,0.07)] bg-surface-card px-4 transition focus-within:border-brand-primary focus-within:ring-4 focus-within:ring-[rgba(14,165,233,0.12)]">
                <Mail className="h-5 w-5 shrink-0 text-text-muted" />
                <input
                  autoComplete="email"
                  className="h-full min-w-0 flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="admin@teqid.com"
                  type="email"
                  value={email}
                  required
                />
              </div>
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-text-primary">
                Password
              </span>
              <div className="mt-2 flex h-12 items-center gap-3 rounded-2xl border border-[rgba(15,23,42,0.07)] bg-surface-card px-4 transition focus-within:border-brand-primary focus-within:ring-4 focus-within:ring-[rgba(14,165,233,0.12)]">
                <Lock className="h-5 w-5 shrink-0 text-text-muted" />
                <input
                  autoComplete="current-password"
                  className="h-full min-w-0 flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  required
                />
                <button
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-text-muted transition hover:bg-slate-100 hover:text-text-primary"
                  onClick={() => setShowPassword((current) => !current)}
                  type="button"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </label>

            <div className="flex items-center justify-between gap-4">
              <label className="flex items-center gap-3 text-sm font-medium text-text-secondary">
                <input
                  checked={rememberMe}
                  className="h-4 w-4 rounded border-slate-300 text-brand-primary accent-brand-primary"
                  onChange={(event) => setRememberMe(event.target.checked)}
                  type="checkbox"
                />
                Remember me
              </label>
            </div>

            {error ? (
              <div className="rounded-2xl border border-red-100 bg-state-errorBg px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </div>
            ) : null}

            <button
              className="flex h-12 w-full items-center justify-center rounded-2xl bg-brand-primary px-5 text-sm font-bold text-white shadow-[0_14px_30px_rgba(14,165,233,0.28)] transition hover:bg-brand-hover focus:outline-none focus:ring-4 focus:ring-[rgba(14,165,233,0.20)] disabled:cursor-not-allowed disabled:opacity-70"
              disabled={submitting || authLoading}
              type="submit"
            >
              {submitting ? (
                <span className="flex items-center gap-3">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Signing in
                </span>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
