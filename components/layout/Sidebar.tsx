"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Network,
  Brain,
  UserPlus,
  BookOpen,
  FileText,
  Sliders,
  TrendingUp,
  Briefcase,
  Settings,
  LogOut,
} from "lucide-react";
import { signOut } from "next-auth/react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Command Center", icon: LayoutDashboard },
  { href: "/workforce", label: "Workforce", icon: TrendingUp },
  { href: "/employees", label: "Employees", icon: Users },
  { href: "/connections", label: "Connections", icon: Network },
  { href: "/ai", label: "AI Decision", icon: Brain },
  { href: "/recruitment", label: "Recruitment", icon: UserPlus },
  { href: "/onboarding", label: "Onboarding", icon: BookOpen },
  { href: "/policies", label: "Policies", icon: FileText },
  { href: "/simulation", label: "Simulation", icon: Sliders },
  { href: "/mobility", label: "Mobility", icon: Briefcase },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="fixed left-0 top-0 h-full w-[220px] flex flex-col z-40"
      style={{
        background: "rgba(0,0,0,0.7)",
        borderRight: "1px solid #4d4d4d",
        backdropFilter: "blur(8px)",
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Logo */}
      <div
        className="px-6 py-6"
        style={{ borderBottom: "1px solid #4d4d4d" }}
      >
        <Link
          href="/dashboard"
          className="block focus-visible:outline focus-visible:outline-1 focus-visible:outline-white/30 rounded"
          aria-label="TalentOS — go to dashboard"
        >
          <span
            className="text-lg font-bold tracking-tighter text-white"
            style={{ fontFamily: "var(--font-nbarchitekt, 'Space Grotesk', sans-serif)" }}
          >
            TALENTOS
          </span>
          <span
            className="block text-[9px] uppercase tracking-widest mt-0.5"
            style={{ color: "#4d4d4d", fontFamily: "var(--font-nbarchitekt, sans-serif)" }}
          >
            Workforce Intelligence
          </span>
        </Link>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded transition-all group focus-visible:outline focus-visible:outline-1 focus-visible:outline-white/30",
                isActive
                  ? "bg-[#343755] text-white"
                  : "text-[#808080] hover:text-white hover:bg-white/5"
              )}
              style={{
                fontFamily: "var(--font-nbarchitekt, sans-serif)",
                fontSize: "12px",
                borderRadius: "5px",
              }}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon
                size={14}
                className={cn(
                  "shrink-0 transition-colors",
                  isActive ? "text-white" : "text-[#4d4d4d] group-hover:text-white"
                )}
                aria-hidden="true"
              />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Sign out */}
      <div className="px-3 pb-6" style={{ borderTop: "1px solid #4d4d4d", paddingTop: "12px" }}>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 px-3 py-2 w-full text-left rounded text-[#808080] hover:text-white hover:bg-white/5 transition-all focus-visible:outline focus-visible:outline-1 focus-visible:outline-white/30"
          style={{
            fontFamily: "var(--font-nbarchitekt, sans-serif)",
            fontSize: "12px",
            borderRadius: "5px",
          }}
        >
          <LogOut size={14} className="shrink-0 text-[#4d4d4d]" aria-hidden="true" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
