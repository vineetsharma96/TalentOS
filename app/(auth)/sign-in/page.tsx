"use client";

import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password. Please try again.");
      } else {
        window.location.href = callbackUrl;
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#000000] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Ambient background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* Glow accent */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(52,55,85,0.2) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-sm"
      >
        {/* Logo / Brand */}
        <div className="mb-10 text-center">
          <motion.h1
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl font-bold tracking-tighter text-white mb-2"
            style={{ fontFamily: "var(--font-nbarchitekt, 'Space Grotesk', sans-serif)" }}
          >
            TALENTOS
          </motion.h1>
          <p
            className="text-[12px] uppercase tracking-widest"
            style={{ color: "#808080", fontFamily: "var(--font-nbarchitekt, sans-serif)" }}
          >
            Workforce Intelligence
          </p>
        </div>

        {/* Sign-in card */}
        <div
          className="p-8 rounded-xl"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid #4d4d4d",
            backdropFilter: "blur(4px)",
          }}
        >
          <h2
            className="text-sm font-bold text-white mb-6 uppercase tracking-widest"
            style={{ fontFamily: "var(--font-nbarchitekt, sans-serif)" }}
          >
            Sign In
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-[10px] uppercase tracking-widest mb-2"
                style={{ color: "#999999", fontFamily: "var(--font-nbarchitekt, sans-serif)" }}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isPending}
                className="w-full h-10 px-3 rounded text-sm text-white placeholder:text-white/20 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/30 disabled:opacity-50 transition-all"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "5px",
                  fontFamily: "var(--font-nbarchitekt, sans-serif)",
                }}
                placeholder="you@company.com"
                aria-describedby={error ? "sign-in-error" : undefined}
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-[10px] uppercase tracking-widest mb-2"
                style={{ color: "#999999", fontFamily: "var(--font-nbarchitekt, sans-serif)" }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isPending}
                  className="w-full h-10 px-3 pr-10 rounded text-sm text-white placeholder:text-white/20 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/30 disabled:opacity-50 transition-all"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "5px",
                    fontFamily: "var(--font-nbarchitekt, sans-serif)",
                  }}
                  placeholder="••••••••"
                  aria-describedby={error ? "sign-in-error" : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors focus-visible:outline focus-visible:outline-1 focus-visible:outline-white/30 rounded"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {/* Error message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  id="sign-in-error"
                  role="alert"
                  aria-live="assertive"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 px-3 py-2 rounded"
                  style={{
                    background: "rgba(255, 80, 80, 0.08)",
                    border: "1px solid rgba(255, 80, 80, 0.2)",
                    borderRadius: "5px",
                  }}
                >
                  <AlertCircle size={12} className="text-red-400 shrink-0" />
                  <p
                    className="text-xs text-red-300"
                    style={{ fontFamily: "var(--font-nbarchitekt, sans-serif)" }}
                  >
                    {error}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending || !email || !password}
              className="w-full h-10 rounded-full font-bold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/30"
              style={{
                background: "#343755",
                color: "#ffffff",
                fontFamily: "var(--font-nbarchitekt, sans-serif)",
                fontSize: "14px",
                borderRadius: "500px",
                marginTop: "8px",
              }}
            >
              {isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 size={14} className="animate-spin" />
                  Signing in…
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Demo hints */}
          <div
            className="mt-6 pt-6 space-y-1"
            style={{ borderTop: "1px solid #4d4d4d" }}
          >
            <p
              className="text-[10px] uppercase tracking-widest mb-2"
              style={{ color: "#4d4d4d", fontFamily: "var(--font-nbarchitekt, sans-serif)" }}
            >
              Demo Accounts
            </p>
            {[
              { email: "admin@talentos.dev", role: "Admin" },
              { email: "manager@talentos.dev", role: "HR Manager" },
              { email: "employee@talentos.dev", role: "Employee" },
            ].map((demo) => (
              <button
                key={demo.email}
                type="button"
                onClick={() => {
                  setEmail(demo.email);
                  setPassword("demo123");
                }}
                className="w-full text-left px-2 py-1 rounded text-[11px] hover:bg-white/5 transition-colors"
                style={{
                  color: "#808080",
                  fontFamily: "var(--font-nbarchitekt, sans-serif)",
                  borderRadius: "5px",
                }}
              >
                <span style={{ color: "#c6c6c6" }}>{demo.role}</span>
                {" · "}
                {demo.email}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
