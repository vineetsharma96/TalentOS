import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-[#000000] flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <main
        className="flex-1 ml-[220px] min-h-screen flex flex-col"
        id="main-content"
        tabIndex={-1}
        aria-label="Main content"
      >
        {/* Skip to content link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-[232px] focus:z-50 focus:px-4 focus:py-2 focus:rounded focus:bg-[#343755] focus:text-white focus:text-sm"
          style={{ fontFamily: "var(--font-nbarchitekt, sans-serif)" }}
        >
          Skip to main content
        </a>

        <div className="flex-1 relative">{children}</div>
      </main>
    </div>
  );
}
