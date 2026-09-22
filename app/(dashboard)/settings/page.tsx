import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { hasPermission } from "@/lib/permissions";
import { SettingsClient } from "@/components/settings/SettingsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
};

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");
  if (!hasPermission(session.user.role, "MANAGE_SYSTEM")) {
    redirect("/unauthorized");
  }

  return (
    <div className="p-8">
      <SettingsClient userEmail={session.user.email ?? "admin@talentos.dev"} userRole={session.user.role} />
    </div>
  );
}
