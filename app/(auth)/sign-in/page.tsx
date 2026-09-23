"use client";

import { Suspense, useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";

function SignInContent() {
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
            className="text-lg font-bold text-white mb-6"
            style={{ fontFamily: "var(--font-nbarchitekt, sans-serif)" }}
          >
            Sign In
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-3 rounded flex items-center gap-2 text-xs"
                  style={{
                    background: "rgba(239, 68, 68, 0.1)",
                    border: "1px solid rgba(239, 68, 68, 0.3)",
                    color: "#fca5a5",
                    fontFamily: "var(--font-nbarchitekt, sans-serif)",
                    borderRadius: "5px",
                  }}
                  role="alert"
                >
                  <AlertCircle size={14} className="shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-[10px] uppercase tracking-widest mb-1.5"
                style={{ color: "#808080", fontFamily: "var(--font-nbarchitekt, sans-serif)" }}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="w-full px-3 py-2 text-sm text-white rounded focus:outline-none transition-colors"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid #4d4d4d",
                  borderRadius: "5px",
                  fontFamily: "var(--font-nbarchitekt, sans-serif)",
                }}
                placeholder="name@company.com"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-[10px] uppercase tracking-widest mb-1.5"
                style={{ color: "#808080", fontFamily: "var(--font-nbarchitekt, sans-serif)" }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="w-full px-3 py-2 pr-9 text-sm text-white rounded focus:outline-none transition-colors"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid #4d4d4d",
                    borderRadius: "5px",
                    fontFamily: "var(--font-nbarchitekt, sans-serif)",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#808080] hover:text-white transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-2.5 text-sm font-bold text-white rounded transition-opacity disabled:opacity-50 mt-2"
              style={{
                background: "#343755",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "5px",
                fontFamily: "var(--font-nbarchitekt, sans-serif)",
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

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#000000]" />}>
      <SignInContent />
    </Suspense>
  );
}
